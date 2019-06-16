const fs = require('fs')
const path = require('path')
const R = require('ramda')
const _ = require('lodash')
const mongoose = require('mongoose')
const bluebird = require('bluebird')
const { mongo: { uri, options } } = require('../config')

// load model

const modelPath = path.resolve(__dirname, '../database/schema')

const models = fs.readdirSync(modelPath)

models.forEach((model) => {
	require(path.join(modelPath, model))
})

// formatWikiCharacters
const formatWikiCharacters = R.map((i) => {
	i._id = i.nmId
	return i
})

const formatData = (item) => {
	item._id = item.url

	_.forIn(item, (value, key) => {
		if (!value || !value.length) delete item[key]
	})

	return item
}
// 引入数据
var characters = require(path.resolve(__dirname, '../database/json/allCharacters.json'))
var houses = require(path.resolve(__dirname, '../database/json/allHouses.json'))
// var books = require('database/json/allBooks.json')
var imdbs = require(path.resolve(__dirname, '../database/json/IMDb.json'))
var wikiCharacters = require(path.resolve(__dirname, '../database/json/wikiCharacters.json'))
var wikiHouses = require(path.resolve(__dirname, '../database/json/wikiHouses.json'))
var books = require(path.resolve(__dirname, '../database/json/allBooks.json'))

wikiCharacters = formatWikiCharacters(wikiCharacters)

module.exports = () => {
	mongoose.set('debug', true)
	mongoose.Promise = bluebird
	mongoose.connect(uri, options)
	mongoose.connection.on('disconnencted', () => {
		mongoose.connect(uri, options)
	})
	mongoose.connection.on('error', (error) => {
		console.log(error)
	})
	mongoose.connection.once('open', async () => {
		console.log('mongodb open!')

		const Character = mongoose.model('Character')
		const WikiCharacter = mongoose.model('WikiCharacter')
		const WikiHouse = mongoose.model('WikiHouse')
		const User = mongoose.model('User')
		const IMDb = mongoose.model('IMDb')
		const Book = mongoose.model('Book')

		characters = _.map(characters, formatData)
		houses = _.map(houses, formatData)
		imdbs = _.map(imdbs, formatData)
		const existCharacter = await Character.find({}).exec()
		if (!existCharacter.length) Character.insertMany(characters)

		const existWikiCharacter = await WikiCharacter.find({}).exec()
		if (!existWikiCharacter.length) WikiCharacter.insertMany(wikiCharacters)

		const existwikiHouses = await WikiHouse.find({}).exec()
		if (!existwikiHouses.length) WikiHouse.insertMany(wikiHouses)

		const existIMDbs = await IMDb.find({}).exec()
		if (!existIMDbs.length) IMDb.insertMany(imdbs)

		const existBooks = await Book.find({}).exec()
		if (!existBooks.length) Book.insertMany(books)

		const user = await User.findOne({ email: '562927176@qq.com' }).exec()
		if (!user) new User({ email: '562927176@qq.com', password: '123456', role: 'admin' }).save()
	})
}
