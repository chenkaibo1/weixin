const router = require('koa-router')()
const message = require('../wechat-lib/message')
const config = require('../config')
router.all('/', message({ token: config.wechat.token }))

module.exports = router
