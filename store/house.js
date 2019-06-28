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
			const str = `House(id: ${id}) {
				_id
				name
				cname
				intro
				wikiId
				words
				sections {
					content
					title
					level
				}
				swornMembers {
					character {
						_id
						name
						cname
						profile
						nmId
						chId
						wikiId
					}
					text
				}
			}`
			console.log(str)
			const body = {
				operationName: null,
				query: `{
						house: House(id: "${id}") {
							_id
							name
							cname
							intro
							wikiId
							words
							sections {
								content
								title
								level
							}
							swornMembers {
								character {
									_id
									name
									cname
									profile
									nmId
									chId
									wikiId
								}
								text
							}
						}
					}
				`,
				variables: {}
			}
			const { data: { data: { house } } } = await service.graphql(body)
			commit('SET_FOCUS_HOUSE', house)
			return house
		} catch (error) {
			console.log(error)
		}
	}
}
