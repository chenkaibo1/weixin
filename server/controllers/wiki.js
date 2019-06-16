const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const R = require('ramda')
const WikiCharacter = mongoose.model('WikiCharacter')
const WikiHouse = mongoose.model('WikiHouse')
exports.getCharacters = async (ctx) => {
	try {
		const { limit = 20 } = ctx.query
		const characters = await WikiCharacter.find({}).limit(+limit).exec()

		ctx.body = characters
	} catch (error) {
		ctx.throw(error)
	}
}

exports.getCharacter = async (ctx) => {
	try {
		const { params } = ctx
		const { id } = params

		const character = await WikiCharacter.findById(id).lean().exec()
		character.images = R.compose(R.map((item) => `/characters/${character.name}/images/${item}`), fs.readdirSync)(
			path.resolve(__dirname, `../../static/characters/${character.name}/images`)
		)
		ctx.body = character
	} catch (error) {
		ctx.throw(error)
	}
}

exports.getHouses = async (ctx) => {
	try {
		const houses = await WikiHouse.find({})
			.populate({ path: 'swornMembers.character', select: '_id name cname profile' })
			.exec()
		ctx.body = houses
	} catch (error) {
		ctx.throw(error)
	}
}

exports.getHouse = async (ctx) => {
	try {
		const house = await WikiHouse.findById(ctx.params.id)
			.populate({
				path: 'swornMembers.character',
				select: 'name cname profile nmId'
			})
			.exec()
		ctx.body = house
	} catch (error) {
		ctx.throw(error)
	}
}
