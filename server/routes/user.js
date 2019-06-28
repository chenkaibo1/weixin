const router = require('koa-router')()
const user = require('../controllers/user')

router.get('/payments', user.getPayments)
router.post('/login', user.login)

module.exports = router
