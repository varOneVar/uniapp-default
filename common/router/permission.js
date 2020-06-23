import roleRoutes, { notLogin } from './routerConfig.js' // 需要权限的路由
import uRouter from './router.js'
const router = uRouter()
import store from '../store/index.js'
import { objParseUrlAndParam } from '../utils/index.js'
/**
 * @param {Array}  roles: 用户身份里的角色参数
 * @param {Object}  route: 当前路由对象
 * @return {Boolean}  true表示通过权限判断
 * */
function hasPermission(roles = ['admin'], route) {
  let includes, excludes
  if (route) {
    includes = route.roles
    excludes = route.exclude_roles
  }
  // IOS8不支持数组的includes写法，用indexOf代替
  // roles身份是admin也允许访问
  if (includes) {
    return roles.some((role) => ~includes.indexOf('admin') || ~includes.indexOf(role))
  } else if (excludes) {
    return !roles.some((role) => ~excludes.indexOf(role))
  }
  return true
}

const ROUTER_AUTH_CACHE = {}

// to必须是 pages/xxx/ddd,不然无法匹配，或者考虑使用唯一name来跳转
router.beforeEach((navType, to) => {
	if (!to.path) {
		throw Error(`路由对象没有path参数，【route】：${JSON.stringify(to)}`)
	}
	if (notLogin.some(v => v.path === to.path)) {
		uni[navType]({
			url: objParseUrlAndParam(to.path, to.query)
		})
		return;
	}
	
	// 缓存重复的跳转
	let permission = true
	if (to.path in ROUTER_AUTH_CACHE) {
		permission = ROUTER_AUTH_CACHE[to.path]
	} else {
		roleRoutes.beforeEach(v => {
			if (v.path === to.path) {
				permission = hasPermission(store.getters.roles, v)
			}
		})
		ROUTER_AUTH_CACHE[to.path] = permission
	}
	// 没有登录就去登录
	if (!store.getters.token) {
		uni.reLaunch({
			url: 'pages/systemPages/login'
		})
	} else {
		// 没有权限
		if (!permission) {
			// 权限处理
		} else {
			uni[navType]({
				url: objParseUrlAndParam(to.path, to.query)
			})
		}
	}
})