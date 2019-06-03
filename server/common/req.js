const rp = require('request-promise')
module.exports = class Req {
	constructor(opts) {
		this.opts = Object.assign({}, opts)
		this.rp = rp.defaults(this.opts)
	}
	async request({ url, method = 'GET', body = {}, headers = {} }) {
		return this.rp({
			url,
			method,
			body,
			headers,
			timeout: 10000
		})
	}
}
