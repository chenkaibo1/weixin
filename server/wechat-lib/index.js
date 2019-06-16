const mongoose = require('mongoose')
const Req = require('../common/req')
const config = require('../config')
const req = new Req({ baseUrl: config.wechat.baseUrl })
const { wechat } = require('./api.json')
const Token = mongoose.model('Token')
const Ticket = mongoose.model('Ticket')
const util = require('./util')
module.exports = class WeChat {
	constructor(opts) {
		this.opts = Object.assign({}, opts)
		this.appID = opts.appID
		this.appSecret = opts.appSecret
		// 获取全局票据
		this.fetchAccessToken()
	}
	/**
   * 请求封装方法
   * @param {*} options 请求参数
   */
	async request(options) {
		options = Object.assign({}, options)

		try {
			const response = await req.req(options)
			return response
		} catch (error) {
			console.error(error)
		}
	}
	/**
   * 获取或更新token
   */
	async fetchAccessToken() {
		let data = await Token.getAccessToken()

		if (!this.isValidToken(data, 'access_token')) {
			data = await this.updateAccessToken()
		}

		await Token.saveAccessToken(data)

		return data
	}
	/**
   * 更新token
   */
	async updateAccessToken() {
		const url = wechat.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret

		const data = await this.request({ url: url })
		const now = new Date().getTime()
		const expiresIn = now + (data.expires_in - 20) * 1000

		data.expires_in = expiresIn

		return data
	}
	/**
	 * 获取临时票据ticket
	 * @param {*} token 
	 */
	async fetchTicket(token) {
		let data = await Ticket.getTicket()

		if (!this.isValidToken(data, 'ticket')) {
			data = await this.updateTicket(token)
		}

		await Ticket.saveTicket(data)

		return data
	}
	/**
	 * 更新临时票据
	 * @param {*} token 
	 */
	async updateTicket(token) {
		const url = wechat.ticket + '?access_token=' + token + '&type=jsapi'

		const data = await this.request({ url: url })
		const now = new Date().getTime()
		const expiresIn = now + (data.expires_in - 20) * 1000

		data.expires_in = expiresIn

		return data
	}
	/**
   * 验证token 是否有效
   * @param {*} data
   * @param {*} name 
   */
	isValidToken(data, name) {
		if (!data || !data[name] || !data.expires_in) {
			return false
		}
		const expiresIn = data.expires_in
		const now = new Date().getTime()

		if (now < expiresIn) {
			return true
		} else {
			return false
		}
	}

	uploadMaterial(token, type, material, permanent) {}
	/**
	 * 获取签名
	 * @param {*} ticket 
	 * @param {*} url 
	 */
	sign(ticket, url) {
		return util.sign(ticket, url)
	}
}
