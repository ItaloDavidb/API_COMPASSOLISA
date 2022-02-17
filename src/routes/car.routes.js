const CarController = require('../app/controller/CarController');
const Validation = require('../app/validation/car');
const ValidationDelete = require('../app/validation/car/delete');
const ValidationGet = require('../app/validation/car/get');
const Token = require('../app/helper/AuthToken');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', Token, Validation, CarController.create);
  routes.get('/', Token, ValidationGet, CarController.find);
  routes.get('/:car_id', Token, ValidationDelete, CarController.findId);
  routes.put('/:car_id', Token, Validation, ValidationDelete, CarController.update);
  routes.delete('/:car_id', Token, ValidationDelete, CarController.delete);
  routes.patch('/:car_id/acessorios/:acessorios_id', Token, CarController.patch);
  server.use(prefix, routes);
};
