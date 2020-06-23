import Vue from 'vue'
import Vuex from 'vuex'
import work from './modules/work.js'
import app from './modules/app.js'
import user from './modules/user.js'
import getters from './getters.js'
import createPersistedState from 'vuex-persistedstate'
import settings from '../settings.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		work,
		app,
		user
	},
	getters,
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {

			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	plugins:[
		createPersistedState({
			storage: {
				getItem: key => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key, value),
				removeItem: key => uni.removeStorageSync(key)
			},
			key: `${settings.appName}-key`
		})
	]
})

export default store
