const express = require('express');
const cors = require('cors');
const router = require('./routes');
require('./infra/database/mongo');
const Errors = require('./app/middlewares/httpError');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.Errors();
  }

  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    router(this.server);
  }

  Errors() {
    this.server.use(Errors);
  }
}
module.exports = new App().server;
