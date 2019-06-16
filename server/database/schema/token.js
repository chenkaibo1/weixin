const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Token = new Schema({
	name: String,
	access_token: String,
	expires_in: Number,
	create_at: {
		type: Date,
		default: Date.now()
	},
	update_at: {
		type: Date,
		default: Date.now()
	}
})

Token.pre('save', (next) => {
	if (this.isNew) {
		this.create_at = this.update_at = Date.now()
	} else {
		this.update_at = Date.now()
	}
	next()
})
Token.statics = {
	async getAccessToken() {
		try {
			const token = await this.findOne({ name: 'access_token' }).lean().exec()
			return token
		} catch (error) {
			console.log(error)
		}
	},
	async saveAccessToken(data) {
		const token = await this.findOne({ name: 'access_token' }).exec()
		if (token) {
			token.access_token = data.access_token
			token.expires_in = data.expires_in
			await token.save()
		} else {
			await this.create({
				name: 'access_token',
				expires_in: data.expires_in,
				access_token: data.access_token
			})
		}
		return data
	}
}

mongoose.model('Token', Token)
