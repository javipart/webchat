const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  doc: {
    type: String,
    required: true,
    index: true,
  },
});

schema.statics.create = function create(data) {
  return this.insertMany({
    name: data.user,
    doc: data.agent,
  });
};

schema.statics.get = function get(doc) {
  return this.findOne({ doc });
};

module.exports = mongoose.model('agent', schema);
