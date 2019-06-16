const rp = require('request-promise')
// const config = require('../config')
// const request = rp.defaults({ baseUrl: config.wechat.baseUrl, json: true })
// module.exports = async ({ url, method = 'GET', body = {}, headers = {} }) => {
// 	return request({
// 		url,
// 		method,
// 		body,
// 		headers,
// 		timeout: 10000
// 	})
// }
module.exports = class Req {
	constructor(opts) {
		this.opts = opts
	}
	async req({ url, method = 'GET', body = {}, headers = {} }) {
		const request = rp.defaults(Object.assign({ json: true }, this.opts))
		return request({
			url,
			method,
			body,
			headers,
			timeout: 10000
		})
	}
}
