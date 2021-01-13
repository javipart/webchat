const mongoose = require('mongoose').set('debug', true);

const mongoIP = 'localhost';
const mongoPort = '27017';
const mongoCollection = 'keybe-test';
const URI = `mongodb://${mongoIP}:${mongoPort}/${mongoCollection}`;

const db = () => {
 mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
  if (err) {
    console.info(err);
  } else {
    console.info(`Successfully connected to MongoDB @ ${mongoIP}:${mongoPort}`);
  }
});
}

module.exports = db;
