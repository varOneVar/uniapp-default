import uRequest from './request.js'
import { objParseUrlAndParam } from '../utils/index.js'

function createInstance(CONFIG) {
	const instance = uRequest(CONFIG)
	// 请求拦截
	instance.interceptor.request = config => {
		if (config.header['Content-Type'] === 'application/x-www-form-urlencoded') {
			config.data = objParseUrlAndParam(config.data)
		}
		return config
	}

	// 响应拦截
	instance.interceptor.response = response => {
		if (response.statusCode === 200) {
			const { data: { flag, data } } = response
			if (flag !== 200) {
				if (flag === 420 || flag === 410) {
					
				}
				return response
			}
			return data
		}
		return response
	}
	return instance
}


export default installRequest(Vue) {
	Vue.prototype.$http = {
		php: createInstance({
			baseUrl: '',
			header: {
				// 'Content-Type': 'application/json;charset=utf-8',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		}),
		java: createInstance({
			baseUrl: '',
			header: {
				'Content-Type': 'application/json;charset=utf-8',
				// 'Content-Type': 'application/x-www-form-urlencoded'
			},
		})
	}
}
