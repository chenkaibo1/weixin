const config = require('../config')
const Wechat = require('../wechat-lib')
const wechatConfig = {
	appID: config.wechat.appID,
	appSecret: config.wechat.appSecret
}

const wechat = new Wechat(wechatConfig)

module.exports = wechat
