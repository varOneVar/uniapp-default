/**
 * 跳转路由，type命名偏vue，结合实际效果，取的类似的名字
 * 当跳转为navigateBack时，url为delta值
 * */
function goWhere(url = 1, type = 'push') {
	switch(type) {
		case 'push': {
			uni.navigateTo({
				url,
				animationDuration:200,
				animationType:'pop-in',
			})
			break;
		}
		case 'back': {
			uni.navigateBack({
				delta: url || 1,
				animationDuration:200,
				animationType:'pop-out',
			})
			break;
		}
		case 'replace': {
			uni.redirectTo({
				url,
			})
			break;
		}
		case 'navbar': {
			uni.switchTo({
				url,
			})
			break;
		}
		case 'reload': {
			uni.reLaunch({
				url,
			})
			break;
		}
	}
}

// 预加载页面
export function preloadPages (list = []) {
	list.forEach(v => {
		uni.preloadPage({
			url: v
		})
	})
}


export default goWhere;