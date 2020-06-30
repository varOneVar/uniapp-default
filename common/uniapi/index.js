import { promisifyUniApi } frpm '../utils/index.js'
import logs from '../utils/log.js'

async function getLocation() {
	try{
		const res = await promisifyUniApi('getLocation', {
			type: 'gcj02'
		})
	}catch(e){
		logs.error('获取地理位置失败！', e)
		//TODO handle the exception
	}
}