// 将对象转化为url参数
export function objParseUrlAndParam(path = '', query = {}) {
	try{
		const arr = []
		Object.entries(([key, value]) => {
			arr.push(`${key}=${value}`) 
		})
		const result = arr.length ? `${path}?${arr.join('&')}` : path
		return result;
	}catch(e){
		//TODO handle the exception
		throw Error(`路由参数错误：【path】:${path} 【query】：${JSON.stringify(query)}`)
	}

}

// 将uniapp的 接口promise化
export function promisifyUniApi(apiName, config = {}, callback) {
	return new Promise((resolve, reject) => {
		uni[apiName]({
			...config,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			},
			complete(response) {
				if (typeof callback === 'function') {
					callback(response)
				}
			}
		})
	})
}