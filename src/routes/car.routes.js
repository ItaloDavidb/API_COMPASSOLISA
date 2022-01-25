const CarController = require('../app/controller/CarController');
module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/',CarController.create,);
  routes.get('/', CarController.find);
  routes.put('/:car_id', );
  routes.delete('/:car_id',);
  server.use(prefix, routes);
  
};