const { GraphQLID, GraphQLObjectType } = require('graphql')
const HouseService = require('../../service/house')
const houseService = new HouseService()
const { HouseCreateType } = require('./model')
const CreateHouse = {
	type: new GraphQLObjectType({
		name: 'IdType',
		fields: {
			_id: {
				type: GraphQLID
			}
		}
	}),
	args: {
		house: {
			name: 'house',
			type: HouseCreateType
		}
	},
	resolve(root, params, options) {
		return houseService.createHouse(params.house)
	}
}

module.exports = {
	CreateHouse
}
