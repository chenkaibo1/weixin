const { GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql')
const HouseService = require('../../service/house')
const { HouseType } = require('./model')
const hosueService = new HouseService()
const House = {
	type: HouseType,
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve(root, params, options) {
		return hosueService.getHouse(params.id)
	}
}

const Houses = {
	type: new GraphQLList(HouseType),
	args: {},
	resolve(root, params, options) {
		return hosueService.getHouses()
	}
}

module.exports = {
	House,
	Houses
}
