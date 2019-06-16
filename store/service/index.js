import { get } from '../util/http'
/**
 * 查询所有家族
 * @return {Promise}
 */
export const allHouses = () => {
	const params = {
		url: `/wiki/houses`
	}
	return get(params)
}

/**
 * 查询主要人物
 * @param {limit} name
 * @return {Promise}
 */
export const povCharacters = (limit = 20) => {
	const params = {
		url: `/wiki/characters?limit=${limit}`
	}
	return get(params)
}

export const getHouse = (id) => {
	const params = {
		url: `/wiki/house/${id}`
	}
	return get(params)
}

export const getCharacter = (id) => {
	const params = {
		url: `/wiki/character/${id}`
	}
	return get(params)
}
