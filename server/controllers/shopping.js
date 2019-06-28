const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.getProducts = async (ctx) => {
	try {
		const products = await Product.find({}).lean().exec()
		ctx.body = products
	} catch (error) {
		ctx.throw(error)
	}
}
