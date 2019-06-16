const router = require('koa-router')()
const wiki = require('../controllers/wiki')

router.get('/house/:id', wiki.getHouse)
router.get('/houses', wiki.getHouses)
router.get('/character/:id', wiki.getCharacter)
router.get('/characters', wiki.getCharacters)

module.exports = router
