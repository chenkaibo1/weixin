const config = require('../config')
const Wechat = require('../wechat-lib')
const Oauth = require('../wechat-lib/oauth')
const wechatConfig = {
	appID: config.wechat.appId,
	appSecret: config.wechat.appSecret
}

exports.getWechatInstance = () => {
	return new Wechat(wechatConfig)
}

exports.getOauthInstance = () => {
	return new Oauth(wechatConfig)
}
