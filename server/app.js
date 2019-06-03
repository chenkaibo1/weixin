const path = require('path')
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const route = require('./middleware/route')
const database = require('./middleware/database')
// error handler
onerror(app)
// 链接数据库
database()
// middlewares
app.use(
	bodyparser({
		enableTypes: [ 'json', 'form', 'text' ]
	})
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, './public')))

// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// use router
route(app)
// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
})

module.exports = app
