const mongoose = require('mongoose').set('debug', true);

const mongoIP = 'localhost';
const mongoPort = '27017';
const mongoCollection = 'keybe-test';
const URI = `mongodb://${mongoIP}:${mongoPort}/${mongoCollection}`;

const authSource = 'admin';
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  poolSize: 10,
  auth: { authSource },
  useUnifiedTopology: true,
  user: 'root',
  pass: '123',
}
const db = () => {
  mongoose.connect(URI, dbOptions, (err) => {
    if (err) {
      console.info(err);
    } else {
      console.info(`Successfully connected to MongoDB @ ${mongoIP}:${mongoPort}`);
    }
  });
}

module.exports = db;
