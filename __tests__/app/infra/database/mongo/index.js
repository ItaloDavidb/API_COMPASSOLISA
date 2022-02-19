const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect('mongodb://127.0.0.1:27017/__tests__').catch((err) => console.log(err));
  }
}

module.exports = new Database().connect();
