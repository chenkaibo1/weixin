const service = require('./service')
export const state = () => {
	return {
		focusHouse: {}
	}
}

export const mutations = {
	SET_FOCUS_HOUSE(state, data) {
		if (data) {
			if (Array.isArray(data.swornMembers)) {
				data.swornMembers.forEach((item) => {
					item.img = `/characters/${item.character.name}/${item.character.name}.jpg`
				})
			}
		}
		state.focusHouse = data
	}
}

export const actions = {
	async focusHouse({ commit }, id) {
		try {
			const res = await service.getHouse(id)
			commit('SET_FOCUS_HOUSE', res.data)
			return res
		} catch (error) {
			console.log(error)
		}
	}
}
