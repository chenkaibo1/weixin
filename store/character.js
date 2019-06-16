const service = require('./service')
export const state = () => {
	return {
		focusCharacter: {}
	}
}

export const mutations = {
	SET_FOCUS_CHARACTER(state, data) {
		data.img = `/characters/${data.name}/${data.name}.jpg`
		state.focusCharacter = data
	}
}

export const actions = {
	async focusCharacter({ commit }, id) {
		try {
			const res = await service.getCharacter(id)
			commit('SET_FOCUS_CHARACTER', res.data)
			return res
		} catch (error) {
			console.log(error)
		}
	}
}
