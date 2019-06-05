const { getWechatInstance } = require('../wechat')
const wechat = getWechatInstance()

// 获取签名
exports.getSignature = async (url) => {
	const { access_token: token } = await wechat.fetchAccessToken()
	const { ticket } = await wechat.fetchTicket(token)

	const params = wechat.sign(ticket, url)
	params.appId = wechat.appID
	return params
}
