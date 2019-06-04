/**
 * 处理微信消息和验证中间件
 */
const getRawBody = require('raw-body')
const sha1 = require('sha1')
const util = require('./util')
module.exports = (opts, reply) => {
	return async (ctx, next) => {
		const { token } = opts
		const { signature, timestamp, nonce, echostr } = ctx.query
		const str = [ token, timestamp, nonce ].sort().join('')
		const shaStr = sha1(str)
		if (ctx.method === 'GET') {
			if (shaStr === signature) {
				ctx.body = echostr
			} else {
				ctx.body = '微信接入验证失败！'
			}
		} else if (ctx.method === 'POST') {
			if (shaStr !== signature) {
				ctx.body = 'Failed'
				return false
			} else {
				const data = await getRawBody(ctx.req, {
					length: ctx.headers['content-length'],
					limit: '1mb',
					encoding: ctx.charset
				})
				// 解析xml
				const content = await util.parseXML(data)
				console.log(content)
				// 将解析后的数据格式化为object
				const message = util.formatMessage(content.xml)
				const body = await reply(message)
				// 将回复的内容封装成xml
				const xml = util.tpl(body, message)
				ctx.status = 200
				ctx.type = 'application/xml'
				ctx.body = xml
			}
		}
	}
}
