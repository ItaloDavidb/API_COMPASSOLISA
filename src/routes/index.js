const { Router } = require('express');
const CarRouter = require('./car.routes');
const PeopleRouter = require('./people.routes');
const LocRouter = require('./loc.routes');



module.exports = server => {
  server.use((req, res, next) => {
    CarRouter(server, new Router());
    PeopleRouter(server, new Router());
    LocRouter(server, new Router());

    next();
  });
};