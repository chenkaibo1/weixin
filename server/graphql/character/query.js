const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql')
const CharacterService = require('../../service/character')
const { CharacterType } = require('./model')
const characterService = new CharacterService()

const Character = {
	type: CharacterType,
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve(root, params, optinons) {
		return characterService.getCharacter(params.id)
	}
}

const Characters = {
	type: new GraphQLList(CharacterType),
	args: {},
	resolve(root, params, optinons) {
		return characterService.getCharacters()
	}
}

module.exports = {
	Character,
	Characters
}
