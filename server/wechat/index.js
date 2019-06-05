const config = require('../config')
const Wechat = require('../wechat-lib')
const wechatConfig = {
	appID: config.wechat.appID,
	appSecret: config.wechat.appSecret
}

exports.getWechatInstance = () => {
	return new Wechat(wechatConfig)
}
