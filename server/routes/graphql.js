const router = require('koa-router')()
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')
const schema = require('../graphql/schema')

router.post('/graphql', async (ctx, next) => {
	try {
		await graphqlKoa({ schema })(ctx, next)
	} catch (error) {
		ctx.throw(error)
	}
})
router.get('/graphiql', async (ctx, next) => {
	await graphiqlKoa({ endpointURL: 'graphql' })(ctx, next)
})

module.exports = router
