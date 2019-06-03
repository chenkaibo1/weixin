/**
 * 处理微信消息和验证中间件
 */
const getRawBody = require('raw-body')
const sha1 = require('sha1')
const { parseXML } = require('./util')
module.exports = (opts, reply) => {
	return async (ctx) => {
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
				const content = await parseXML(data)
				console.log(content)
				ctx.status = 200
			}
		}
	}
}
