const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  
  date: { type: Date, default: Date.now },
});

schema.statics.create = function create() {
  
};

schema.statics.get = function get() {
  
};

module.exports = mongoose.model('user', schema);
