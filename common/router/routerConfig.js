/**
 * 需要加权限的路由就放进该配置中，没有添加统一算允许访问处理
 * roles 与 exclude_roles二选一，同时存在时，roles权重大
 * roles 是 include_roles, 只有这些角色才允许访问，exclude_roles相反
 * roles 与 exclude_roles必须为数组
 * notLogin 表示无需登录
 */
const authRoutes = [
	{
		path: 'pages/mine/mine',
		roles: ['admin'],
		// exclude_roles: []
	}
]

// 权重是无需登录大，如果无需登录就不用判断权限了
const notLogin = [{
	path: 'pages/index/index',
}]
export default authRoutes