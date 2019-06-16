const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Ticket = new Schema({
	name: String,
	ticket: String,
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

Ticket.pre('save', function(next) {
	if (this.isNew) {
		this.create_at = this.update_at = Date.now()
	} else {
		this.update_at = Date.now()
	}

	next()
})

Ticket.statics = {
	async getTicket() {
		const ticket = await this.findOne({ name: 'ticket' }).exec()

		return ticket
	},

	async saveTicket(data) {
		const ticket = await this.findOne({ name: 'ticket' }).exec()
		if (ticket) {
			ticket.ticket = data.ticket
			ticket.expires_in = data.expires_in
			await ticket.save()
		} else {
			await this.create({
				name: 'ticket',
				expires_in: data.expires_in,
				ticket: data.ticket
			})
		}
		return data
	}
}

mongoose.model('Ticket', Ticket)
