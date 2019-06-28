const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const HouseQueries = require('./house/query')
const HouseMutations = require('./house/mutation')
const CharacterQueries = require('./character/query')
const CharacterMutations = require('./character/mutation')
const a = Object.assign(HouseQueries, CharacterQueries)
console.log(a)

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Queries',
		fields: Object.assign(HouseQueries, CharacterQueries)
	}),
	mutation: new GraphQLObjectType({
		name: 'Mutations',
		fields: Object.assign(HouseMutations, CharacterMutations)
	})
})
