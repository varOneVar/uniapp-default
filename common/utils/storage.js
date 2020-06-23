export default function storage(sercet_key) {
	return {
		sercet_key: sercet_key || 'uniapp_demo',
		set(key, value) {
			try{
				const data = JSON.stringify(value)
				uni.setStorageSync(this.sercet_key + key, data)
			}catch(e){
				uni.setStorageSync(this.sercet_key + key, value)
			}
		},
		get(key, def) {
			try{
				const value = uni.getStorageSync(this.sercet_key + key)
				return JSON.parse(value)
			}catch(e){
				return def
			}
		},
		remove(key) {
			uni.removeStorageSync(this.sercet_key + key)
		},
		clear() {
			uni.clearStorageSync()
		}
	}
}