const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLID,
	GraphQLInputObjectType
} = require('graphql')

const SectionType = new GraphQLObjectType({
	name: 'wikiCharacterSections',
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

exports.CharacterType = new GraphQLObjectType({
	name: 'WikiCharacter',
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
		father: {
			type: new GraphQLList(GraphQLString)
		},
		allegiances: {
			type: new GraphQLList(GraphQLString)
		},
		playedBy: {
			type: new GraphQLList(GraphQLString)
		},
		profile: {
			type: GraphQLString
		},
		nmId: {
			type: GraphQLString
		},
		chId: {
			type: GraphQLString
		},
		sections: {
			type: new GraphQLList(SectionType)
		},
		wikiId: {
			type: GraphQLInt
		}
	}
})

exports.CharacterCreateType = new GraphQLInputObjectType({
	name: 'CharacterCreate',
	fields: {
		name: {
			type: GraphQLString
		},
		cname: {
			type: GraphQLString
		},
		father: {
			type: new GraphQLList(GraphQLString)
		},
		allegiances: {
			type: new GraphQLList(GraphQLString)
		},
		playedBy: {
			type: new GraphQLList(GraphQLString)
		},
		profile: {
			type: GraphQLString
		},
		nmId: {
			type: GraphQLString
		},
		chId: {
			type: GraphQLString
		},
		wikiId: {
			type: GraphQLInt
		}
	}
})
