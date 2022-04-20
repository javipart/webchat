const mongoose = require('mongoose').set('debug', true);

// const mongoIP = 'localhost';
// const mongoPort = '27017';
// const mongoCollection = 'keybe-test';
const URI = 'mongodb+srv://root:123@cluster0.yyvpo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
class MongoDatabase {
  constructor() {
    // const authSource = 'admin';
    // this.dbOptions = {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   poolSize: 10,
    //   auth: { authSource },
    //   useUnifiedTopology: true,
    //   user: 'root',
    //   pass: '123',
    // };
    this.mongoose = mongoose;
    this.uri = URI;
    // this.ip = mongoIP;
    // this.port = mongoPort;
    // this.collection = mongoCollection;
  }


  connect() {
    this.mongoose.connect(this.uri, (err) => {
      if (err) {
        console.info(err);
      } else {
        console.info(`Successfully connected to MongoDB`);
      }
    });
  }
}

module.exports = new MongoDatabase();
