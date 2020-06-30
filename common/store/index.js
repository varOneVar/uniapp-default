import Vue from 'vue'
import Vuex from 'vuex'
import work from './modules/work.js'
import app from './modules/app.js'
import user from './modules/user.js'
import getters from './getters.js'
import createPersistedState from 'vuex-persistedstate'
import settings from '../settings.js'
import storage from '../utils/storage.js'
const Storage = storage()
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		work,
		app,
		user
	},
	getters,
	plugins:[
		createPersistedState({
			storage: {
				getItem: key => Storage.get(key),
				setItem: (key, value) => Storage.set(key, value),
				removeItem: key => Storage.remove(key)
			},
			key: `${settings.appName}-vuex_key`
		})
	]
})

export default store
