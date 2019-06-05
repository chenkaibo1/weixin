const wechat = require('../api/wechat')

exports.signature = async (ctx) => {
	try {
		let url = ctx.query.url
		ctx.assert(url, 401, 'url不能为空')
		url = decodeURIComponent(url)
		const params = await wechat.getSignature(url)
		ctx.status = 200
		ctx.body = params
	} catch (error) {
		ctx.throw(500, error.message)
	}
}
