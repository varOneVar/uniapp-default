const state = {
	token: '',
	userInfo: {},
	mobile: '',
}

const mutations = {
	CHANGE_TOKEN(state, str = '') {
		state.token = str
	},
	CHANGE_TOKEN(state, obj = {}) {
		state.userInfo = obj
	},
	RESET_USER_STATE(state) {
		state.token = ''
		state.userInfo = {}
	}
}

const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}