const Req = require('../common/req')
const config = require('../config')
const req = new Req(config.oauth.baseUrl)
const { oauth } = require('./api.json')

module.exports = class WechatOAuth {
	constructor(opts) {
		this.appID = opts.appID
		this.appSecret = opts.appSecret
	}

	async request(options) {
		options = Object.assign({}, options, { json: true })

		try {
			const response = await req.req(options)
			return response
		} catch (error) {
			console.error(error)
		}
	}

	getAuthorizeURL(scope = 'snsapi_base', target, state) {
		const url = `${oauth.authorize}?appid=${this.appID}&redirect_uri=${encodeURIComponent(
			target
		)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`

		return url
	}

	async fetchAccessToken(code) {
		const url = `${oauth.accessToken}?appid=${this.appID}&secret=${this
			.appSecret}&code=${code}&grant_type=authorization_code`
		const data = await this.request({ url: url })

		return data
	}

	async getUserInfo(token, openID, lang = 'zh_CN') {
		const url = `${oauth.userInfo}?access_token=${token}&openid=${openID}&lang=${lang}`

		const data = await this.request({ url: url })

		return data
	}
}
