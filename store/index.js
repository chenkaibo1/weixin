const service = require('./service')
export const state = () => {
	return {
		imageCDN: '你的七牛 CDN',
		homePageScroll: {
			home: 0,
			house: 0
		},
		APICharacters: null,
		IMDb: null,
		authUser: null,
		shoppingScroll: 0,
		houses: [],
		characters: [],
		focusCharacter: {},
		user: null,
		products: [],
		focusProduct: {},
		payments: []
	}
}

export const mutations = {
	SET_HOUSES(state, data) {
		if (Array.isArray(data)) {
			data.forEach((item) => {
				item.houseImage = `/houses/${item.cname}.jpg`
			})
		}
		state.houses = data
	},
	SET_CHARACTERS(state, data) {
		if (Array.isArray(data)) {
			data.forEach((item) => {
				item.profileImg = `/characters/${item.name}/${item.name}.jpg`
			})
		}
		state.characters = data
	},
	SET_HOME_PAGE_SCROLL(state, { home, house }) {
		state.homePageScroll = {
			home,
			house
		}
	}
}

export const actions = {
	async fetchHouses({ commit }) {
		try {
			const res = await service.allHouses()
			commit('SET_HOUSES', res.data)

			return res
		} catch (error) {
			console.log(error)
		}
	},

	async fetchCharacters({ commit }) {
		const res = await service.povCharacters(500)

		commit('SET_CHARACTERS', res.data)
		return res
	},
	homePageScroll({ commit }, { home, house }) {
		commit('SET_HOME_PAGE_SCROLL', { home, house })
	}
}
