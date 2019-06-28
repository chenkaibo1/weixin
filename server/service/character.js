const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const R = require('ramda')
const WikiCharacter = mongoose.model('WikiCharacter')

module.exports = class CharacterService {
	async getCharacters(limit = 20) {
		try {
			const characters = await WikiCharacter.find({}).limit(+limit).exec()

			return characters
		} catch (error) {
			throw error
		}
	}
	async getCharacter(id) {
		try {
			const character = await WikiCharacter.findById(id).lean().exec()
			character.images = R.compose(R.map((item) => `/characters/${character.name}/images/${item}`), fs.readdirSync)(
				path.resolve(__dirname, `../../static/characters/${character.name}/images`)
			)
			return character
		} catch (error) {
			throw error
		}
	}
	async createCharacter(character) {
		try {
			const res = await WikiCharacter.create(character)
			return res._id
		} catch (error) {
			throw error
		}
	}
}
