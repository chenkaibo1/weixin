import axios from 'axios'

axios.defaults.baseURL = '/api'

export const get = (param) => {
	return new Promise((resolve, reject) => {
		axios
			.get(param.url, {
				params: param.query || {},
				headers: param.headers || {}
			})
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
export const post = (param, config = {}) => {
	return new Promise((resolve, reject) => {
		axios
			.post(param.url, param.body, config)
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
export const put = (param, config = {}) => {
	return new Promise((resolve, reject) => {
		axios
			.put(param.url, param.body, config)
			.then((res) => {
				resolve(res)
			})
			.catch((err) => reject(err))
	})
}
export const remove = (param, config = {}) => {
	return new Promise((resolve, reject) => {
		axios
			.delete(param.url, config)
			.then((res) => {
				resolve(res)
			})
			.catch((err) => reject(err))
	})
}
