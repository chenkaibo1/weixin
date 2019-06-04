const router = require('koa-router')()
const message = require('../wechat-lib/message')
const config = require('../config')
const reply = require('../wechat/reply')
router.all('/', message({ token: config.wechat.token }, reply))

module.exports = router
