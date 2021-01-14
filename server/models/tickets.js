const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  status: {
    type: String,
    enum: ['created', 'resolved', 'closed'],
    default: 'created',
    required: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  userCreate: {
    type: String,
    required: true,
  },
  userUpdate: {
    type: String,
    default: '0',
  },
  details: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

schema.statics.create = function create() {
  
};

schema.statics.get = function get() {
  
};

module.exports = mongoose.model('ticket', schema);
