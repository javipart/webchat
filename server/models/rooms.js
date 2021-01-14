const mongoose = require('mongoose');

const { Schema } = mongoose;
const chat = require('./schemas/chat');

const schema = new Schema({
  user: {
    type: String,
    required: true,
    index: true,
  },
  agent: {
    type: String,
    required: true,
    index: true,
  },
  chat: { type: [chat], required: true },
  date: { type: Date, default: Date.now },
});

schema.statics.create = function create(data) {
  return this.insertMany({
    user: data.user,
    agent: data.agent,
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

schema.statics.getAgent = function getAgent(id) {
  this.find({ agent: id });
};

module.exports = mongoose.model('room', schema);
