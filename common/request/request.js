import CancelRepeatRequest from './cancelRepeatRequest.js'
const CANCEL = new CancelRepeatRequest()


export default function uRequest (uconfig) {
	return {
		config: {
			url: '',
			method: 'GET',
			data: {},
			responseType: 'text',
			timeout: 60000,
			header: {
				'Content-Type': 'application/json;charset=utf-8',
				// 'Content-Type': 'application/x-www-form-urlencoded'
			},
			...uconfig
		},
		interceptor: {
			request: null,
			response: null
		},
		request(options = {}) {
			const OPTIONS = Object.assign({}, this.config, options)
			const baseUrl = OPTIONS.baseUrl || ''
			OPTIONS.url = baseUrl + OPTIONS.url
			delete OPTIONS.baseUrl
			return new Promise((resolve, reject) => {
				const { url, method, data } = OPTIONS
				const flag = `url=${url}&request_method=${method}&request_params=${JSON.stringify(data)}`
				if (CANCEL.has(flag)) {
					reject('重复请求被取消')
					return
				}
				if (data.noCancel) {
					delete data.noCancel
				} else {
					CANCEL.add(flag)
				}
				OPTIONS.complate = response => {
					const statusCode = response.statusCode
					response.config = OPTIONS
					// 本地环境打印结果
					if (process.env.NODE_ENV === 'development') {
						if (statusCode === 200) {
							console.log("【" + OPTIONS.requestId + "】 结果：" + JSON.stringify(response.data))
						}
					}
					if (this.interceptor.response) {
						const newResponse = this.interceptor.response(response)
						newResponse && (response = newResponse)
					}
					CANCEL.remove(flag)
					if ((statusCode < 300 && statusCode >= 200) || statusCode === 304) {
						resolve(response)
					} else {
						reject(response)
					}
				}
				OPTIONS.requestId = Date.now()
				if (this.interceptor.request) {
					const _config = this.interceptor.request(OPTIONS)
					if (_config) {
						OPTIONS = _config
					}
				}
				// 本地环境打印结果
				if (process.env.NODE_ENV === 'development') {
					console.log("【" + OPTIONS.requestId + "】 地址：" + OPTIONS.url)
					if (OPTIONS.data) {
						console.log("【" + OPTIONS.requestId + "】 参数：" + JSON.stringify(OPTIONS.data))
					}
				}
				if (OPTIONS.cancelToken) {
					OPTIONS.cancelToken.promise.then(function onCanceled(cancel) {
						reject(cancel);
					});
					return;
				}
				uni.request(OPTIONS)
			})
		},
		get(url, data, options = {}) {
			return this.request({
				url,
				data,
				method = 'GET',
				...options
			})
		},
		post(url, data, options = {}) {
			return this.request({
				url,
				data,
				method = 'POST'
				...options
			})
		}
	}
}

