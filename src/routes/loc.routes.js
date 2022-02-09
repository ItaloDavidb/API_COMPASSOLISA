const LocController = require('../app/controller/LocController');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/',LocController.create,);
  routes.get('/', LocController.find);
  server.use(prefix, routes);
  
};