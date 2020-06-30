export default function storage(sercet_key) {
	return {
		keysPool: [],
		sercet_key: sercet_key || 'uniapp_demo',
		has(key) {
			return this.keysPool.find(v => v === this.sercet_key + key)
		},
		set(key, value) {
			try{
				const data = JSON.stringify(value)
				this.keysPool.push(this.sercet_key + key)
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
		forEach(fn) {
			if (typeof fn !=== 'function') {
				throw Error('参数必须是一个函数')
			}
			this.keysPool.forEach(key => {
				const value = this.get(key)
				fn && fn(key, value)
			})
		},
		clear() {
			uni.clearStorageSync()
		}
	}
}