const Router = require('koa-router')
const router = new Router()
const weixin = require('../routes/weixin')
const wiki = require('../routes/wiki')
const shopping = require('../routes/shopping')
const user = require('../routes/user')
const graphql = require('../routes/graphql')

module.exports = (app) => {
	router.use('/api', graphql.routes(), graphql.allowedMethods())
	router.use('/api/user', user.routes(), user.allowedMethods())
	router.use('/api/shopping', shopping.routes(), shopping.allowedMethods())
	router.use('/api/weixin', weixin.routes(), weixin.allowedMethods())
	router.use('/api/wiki', wiki.routes(), wiki.allowedMethods())
	app.use(router.routes(), router.allowedMethods())
}
