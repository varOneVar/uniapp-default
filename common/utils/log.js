// 为后续动作做准备，比如日志上报
export default {
	log(...arg) {
		if (process.env.NODE_ENV === 'development') {
			console.log(...arg)
		}
	},
	error(...arg) {
		if (process.env.NODE_ENV === 'development') {
			console.error(...arg)
		}
	}
}