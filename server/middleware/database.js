const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const bluebird = require('bluebird')
const { mongo: { uri, options } } = require('../config')

// load model

const modelPath = path.resolve(__dirname, '../database/schema')

const models = fs.readdirSync(modelPath)

models.forEach((model) => {
	require(path.join(modelPath, model))
})

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
	mongoose.connection.on('open', async () => {
		console.log('mongodb open!')
	})
}
