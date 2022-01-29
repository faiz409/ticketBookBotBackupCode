const mongooose = require('mongoose');
const ticketSchema = new mongooose.Schema({
    userName: { type: String, require: true },
    mobile: { type: Number, require: true },
    mail: { type: String, require: true, unique: true },
    personNumber: { type: String, require: true },
    amount: { type: String, require: true },
    placeAndTime: { type: Array, require: true }
});

// eslint-disable-next-line new-cap
const ticketData = new mongooose.model('Ticket', ticketSchema);

module.exports = ticketData;
