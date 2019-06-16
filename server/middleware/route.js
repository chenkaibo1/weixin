const Router = require('koa-router')
const router = new Router()
const weixin = require('../routes/weixin')
const wiki = require('../routes/wiki')

module.exports = (app) => {
	router.use('/api/weixin', weixin.routes(), weixin.allowedMethods())
	router.use('/api/wiki', wiki.routes(), wiki.allowedMethods())
	app.use(router.routes(), router.allowedMethods())
}
