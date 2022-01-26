const CarController = require('../app/controller/CarController');
const Validation = require('../app/validation/car');
module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/',Validation,CarController.create,);
  routes.get('/', CarController.find);
  routes.get('/:car_id', CarController.findId);
  routes.put('/:car_id',CarController.update );
  routes.delete('/:car_id',CarController.delete);
  server.use(prefix, routes);
  
};