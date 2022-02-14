const LocController = require('../app/controller/LocController');
const Validation = require('../app/validation/loc');
const ValidationGet = require('../app/validation/loc/get');
const ValidationDelet = require('../app/validation/loc/delete');
module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/',Validation,LocController.create,);
  routes.put('/:loc_id', ValidationDelet,Validation,LocController.update);
  routes.delete('/:loc_id', ValidationDelet,LocController.delete);
  routes.get('/', ValidationGet,LocController.find);
  routes.get('/:loc_id', ValidationDelet,ValidationGet,LocController.findId);
  server.use(prefix, routes);
};