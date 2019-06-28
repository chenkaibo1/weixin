const service = require('./service')
export const state = () => {
	return {
		user: {},
		authUser: {},
		payments: []
	}
}

export const mutations = {
	SET_USER(state, data) {
		state.user = data
	},
	SET_AUTH_USER(state, data) {
		state.focusCharacter = data
	},
	SET_PAYMENTS(state, data) {
		state.payments = data
	}
}

export const actions = {
	async fetchPayments({ commit }) {
		const { data } = await service.getPayments()
		commit('SET_PAYMENTS', data)
		return data
	},
	async login({ commit }, user) {
		try {
			const res = await service.login(user)

			commit('SET_USER', res.data)

			return res.data
		} catch (e) {
			if (e.response.status === 401) {
				throw new Error("You can't do it")
			} else {
				throw e
			}
		}
	}
}
