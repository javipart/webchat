const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  doc: {
    type: String,
    required: true,
    index: true
  },
  phone: {
    type: String,
    required: true,
    index: true,
  },
});

schema.statics.create = function create(data) {
  return this.insertMany(data);
};

schema.statics.getAll = function getAll() {
  return this.find({});
};

module.exports = mongoose.model('user', schema);
