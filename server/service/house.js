const mongoose = require('mongoose')
const WikiHouse = mongoose.model('WikiHouse')

module.exports = class HouseService {
	async getHouses() {
		try {
			const houses = await WikiHouse.find({})
				.populate({ path: 'swornMembers.character', select: '_id name cname profile' })
				.exec()
			return houses
		} catch (error) {
			throw error
		}
	}
	async getHouse(id) {
		try {
			const house = await WikiHouse.findById(id)
				.populate({
					path: 'swornMembers.character',
					select: 'name cname profile nmId'
				})
				.exec()
			return house
		} catch (error) {
			throw error
		}
	}
	async createHouse(house) {
		try {
			const res = await WikiHouse.create(house)
			return res._id
		} catch (error) {
			throw error
		}
	}
}
