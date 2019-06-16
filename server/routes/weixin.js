const router = require('koa-router')()
const message = require('../wechat-lib/message')
const config = require('../config')
const reply = require('../wechat/reply')
const { signature, redirect, oauth } = require('../controllers/wechat')
router.all('/', message({ token: config.wechat.token }, reply))
router.get('/signature', signature)
router.get('/redirect', redirect)
router.get('/oauth', oauth)

module.exports = router
