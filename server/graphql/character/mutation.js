const { GraphQLID } = require('graphql')
const CharacterService = require('../../service/character')
const characterService = new CharacterService()
const { CharacterCreateType } = require('./model')
const CreateCharacter = {
	type: GraphQLID,
	args: {
		character: {
			name: 'character',
			type: CharacterCreateType
		}
	},
	resolve(root, params, options) {
		return characterService.createCharacter(params.body)
	}
}

module.exports = {
	CreateCharacter
}
