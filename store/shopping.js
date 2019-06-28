const service = require('./service')
export const state = () => {
	return {
		products: [],
		shoppingScroll: 0
	}
}

export const mutations = {
	SET_PRODUCTS(state, data) {
		state.focusCharacter = data
	},
	SET_SHOPPING_SCROLL(state, payload) {
		state.shoppingScroll = payload
	}
}

export const actions = {
	async fetchProducts({ commit }, id) {
		try {
			const res = await service.getProducts(id)
			commit('SET_PRODUCTS', res.data)
			return res
		} catch (error) {
			console.log(error)
		}
	}
}
