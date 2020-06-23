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