const mongoose = require('mongoose')
const Payment = mongoose.model('Payment')
const User = mongoose.model('User')

exports.getPayments = async (ctx) => {
	try {
		const payments = await Payment.find({}).lean().exec()
		ctx.body = payments
	} catch (error) {
		ctx.throw(error)
	}
}

exports.login = async (ctx) => {
	try {
		const { email, password } = ctx.request.body
		var user = await User.findOne({ email: email }).exec()
		var match = null
		if (user) match = await user.comparePassword(password, user.password)
		if (match) {
			ctx.session.user = {
				_id: user._id,
				role: user.role,
				email: user.email,
				nickname: user.nickname,
				avatarUrl: user.avatarUrl
			}
			ctx.body = {
				email: user.email,
				nickname: user.nickname,
				avatarUrl: user.avatarUrl
			}
		} else {
			throw new Error('USER.WRONG_PASSWORD')
		}
	} catch (error) {
		ctx.throw(error)
	}
}
