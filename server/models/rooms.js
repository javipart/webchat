const mongoose = require('mongoose');

const { Schema } = mongoose;
const chat = require('./schemas/chat');

const schema = new Schema({
  transmitter: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  chat: { type: [chat], required: true },
  date: { type: Date, default: Date.now },
});

schema.statics.create = function create() {
  
};

schema.statics.pushMessage = function pushMessage() {
  
};

schema.statics.get = function get() {
  
};

module.exports = mongoose.model('room', schema);
