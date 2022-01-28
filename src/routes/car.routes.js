const CarController = require('../app/controller/CarController');
const Validation = require('../app/validation/car');
const ValidationD= require('../app/validation/car/delete');
const ValidationG = require('../app/validation/car/get');
module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/',Validation,CarController.create,);
  routes.get('/', ValidationG,CarController.find);
  routes.get('/:car_id', ValidationD,CarController.findId);
  routes.put('/:car_id',Validation,ValidationD,CarController.update );
  routes.delete('/:car_id',ValidationD,CarController.delete);
  server.use(prefix, routes);
  
};