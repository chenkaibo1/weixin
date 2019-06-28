const router = require('koa-router')()
const shopping = require('../controllers/shopping')

router.get('/products', shopping.getProducts)

module.exports = router
