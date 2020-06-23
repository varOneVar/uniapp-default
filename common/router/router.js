// 跳转路由，type命名偏vue，结合实际效果，取的类似的名字
export default function uRouter() {
	return {
		callback: (navType = 'navigateTo', to) => {
			uni[navType](to)
		},
		beforeEach(fn) {
			if(typeof fn === 'function') this.callback = fn
		},
		// 保留当前页面， 跳转其他页面
		push(to) {
			this.callback('navigateTo', to)
		},
		// 关闭当前页面，跳转其他页面
		replace(to) {
			this.callback('redirectTo', to)
		},
		// 关闭当前页面，回退到前面的路由栈里的页面,delta决定需要返回几层
		go(delta) {
			uni.navigateBack({
				delta,
				animationDuration:200,
				animationType:'pop-out',
			})
		},
		// 返回上一级页面
		back() {
			uni.navigateBack({
				delta: 1,
				animationDuration:200,
				animationType:'pop-out',
			})
		}
		// 切换tabBar页面
		toTab(to) {
			this.callback('switchTab', to)
		},
		// 关闭所有页面，打开某个页面
		reload(to) {
			this.callback('reLaunch', to)
		},
		// 预加载页面,不具备打开页面能力，被预载的页面，在打开时速度更快。
		preloadPages(arr) {
			list.forEach(to => uni.preloadPage(to))
		}
	}
}