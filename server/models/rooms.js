const mongoose = require('mongoose');

const { Schema } = mongoose;
const chat = require('./schemas/chat');

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'user',
  },
  agent: {
    type: String,
    required: true,
    index: true,
  },
  chat: { type: [chat], required: true },
  date: { type: Date, default: Date.now },
});

schema.statics.saveData = function saveData(data) {
  return this.bulkWrite([
    {
      insertOne: {
        document: {
          user: data.user,
          agent: data.agent,
          chat: data.chat,
        }
      }
    }
  ]).then(room => this.findById(room.insertedIds[0])
    .populate('user')
    .exec()
    .then(user => user));
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
  return this.findOne({ [field]: id });
};

schema.statics.getAgent = function getAgent(id) {
  return this.find({ agent: id })
    .populate('user')
    .exec()
    .then(user => user);
};

module.exports = mongoose.model('room', schema);
