const { getWechatInstance, getOauthInstance } = require('../wechat')
const wechat = getWechatInstance()

// 获取签名
exports.getSignature = async (url) => {
	const { access_token: token } = await wechat.fetchAccessToken()
	const { ticket } = await wechat.fetchTicket(token)

	const params = wechat.sign(ticket, url)
	params.appId = wechat.appID
	return params
}
exports.getAuthorizeURL = (...args) => {
	const oauth = getOauthInstance()

	return oauth.getAuthorizeURL(...args)
}

exports.getUserByCode = async (code) => {
	const oauth = getOauthInstance()

	const data = await oauth.fetchAccessToken(code)
	const openid = data.openid
	const user = await oauth.getUserInfo(data.access_token, openid)

	return user
}
