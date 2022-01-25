const { Router } = require('express');
const CarRouter = require('./car.routes');



module.exports = server => {
  server.use((req, res, next) => {
    CarRouter(server, new Router());
    next();
  });
};