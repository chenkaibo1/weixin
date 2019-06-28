const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLInputObjectType
} = require('graphql')
const { CharacterType } = require('../character/model')

const SwornMemberType = new GraphQLObjectType({
	name: 'swornMembers',
	fields: {
		character: {
			type: CharacterType
		},
		text: {
			type: GraphQLString
		}
	}
})

const SectionType = new GraphQLObjectType({
	name: 'wikiHosueSections',
	fields: {
		content: {
			type: new GraphQLList(GraphQLString)
		},
		title: {
			type: GraphQLString
		},
		level: {
			type: GraphQLInt
		}
	}
})

exports.HouseType = new GraphQLObjectType({
	name: 'WikiHouse',
	fields: {
		_id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		cname: {
			type: GraphQLString
		},
		sections: {
			type: new GraphQLList(SectionType)
		},
		intro: {
			type: GraphQLString
		},
		wikiId: {
			type: GraphQLInt
		},
		words: {
			type: GraphQLString
		},
		swornMembers: {
			type: new GraphQLList(SwornMemberType)
		}
	}
})

exports.HouseCreateType = new GraphQLInputObjectType({
	name: 'HouseCreate',
	fields: {
		name: {
			type: GraphQLString
		},
		cname: {
			type: GraphQLString
		},
		intro: {
			type: GraphQLString
		},
		wikiId: {
			type: GraphQLInt
		},
		words: {
			type: GraphQLString
		}
	}
})
