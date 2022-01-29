const CarController = require('../app/controller/CarController');
const Validation = require('../app/validation/car');
const ValidationDelete= require('../app/validation/car/delete');
const ValidationGet = require('../app/validation/car/get');
module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/',Validation,CarController.create,);
  routes.get('/', ValidationGet,CarController.find);
  routes.get('/:car_id', ValidationDelete,CarController.findId);
  routes.put('/:car_id',Validation,ValidationDelete,CarController.update );
  routes.delete('/:car_id',ValidationDelete,CarController.delete);
  server.use(prefix, routes);
  
};