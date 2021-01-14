const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = new Schema({
    transmitter: { type: String, required: true, index: true },
    receiver: { type: Boolean, required: true, index: true },
    message: { type: Boolean, required: true },
    date: { type: Date, default: Date.now },
});
