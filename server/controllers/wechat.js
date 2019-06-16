const url = require('url')
const qs = require('querystring')
const wechat = require('../api/wechat')
const config = require('../config')

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
// 网页上点某按钮，直接跳转到 http://x.o/wechat-redirect?visit=a&id=b
// 用户被重定向到 Wechat Redirect URL 授权验证
// 验证后，自动二跳进入 http://x.o/oauth?code=xxxxxx&state=a_b
exports.redirect = async (ctx) => {
	const redirect = config.SITE_ROOT_URL + '/oauth'
	const scope = 'snsapi_userinfo'
	const { visit, id } = ctx.query
	const params = id ? `${visit}_${id}` : visit

	const url = wechat.getAuthorizeURL(scope, redirect, params)

	ctx.redirect(url)
}

exports.oauth = async (ctx) => {
	const queryUrl = ctx.query.url
	const urlObj = url.parse(decodeURIComponent(queryUrl))
	const params = qs.parse(urlObj.query)
	const code = params.code
	const user = await wechat.getUserByCode(code)

	console.log(user)
	ctx.session = {
		openid: user.openid
	}
	ctx.body = {
		success: true,
		user: user
	}
}
