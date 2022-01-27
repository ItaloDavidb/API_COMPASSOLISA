const CarController = require('../app/controller/CarController');
const Validation = require('../app/validation/car');
const ValidationP= require('../app/validation/car/put');
const ValidationD= require('../app/validation/car/delete');
module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/',Validation,CarController.create,);
  routes.get('/', CarController.find);
  routes.get('/:car_id', ValidationD,CarController.findId);
  routes.put('/:car_id',ValidationD,ValidationP,CarController.update );
  routes.delete('/:car_id',ValidationD,CarController.delete);
  server.use(prefix, routes);
  
};