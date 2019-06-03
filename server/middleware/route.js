const Router = require('koa-router')
const router = new Router()
const weixin = require('../routes/weixin')

module.exports = (app) => {
	router.use('/weixin', weixin.routes(), weixin.allowedMethods())
	app.use(router.routes(), router.allowedMethods())
}
