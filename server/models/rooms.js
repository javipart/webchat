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

schema.statics.create = function create(data) {
  return this.insertMany({
    transmitter: data.transmitter,
    receiver: data.receiver,
    chat: data.chat,
  });
};

schema.statics.pushMessage = function pushMessage(id, data) {
  return this.updateOne({
    _id: id,
  }, {
    $addToSet: {
      chat: {
        transmitter: data.transmitter,
        receiver: data.receiver,
        message: data.message,
      }
    }
  });
};

schema.statics.get = function get(id) {
  const field = '_id';
  this.findOne({ [field]: id });
};

module.exports = mongoose.model('room', schema);
