const LocController = require('../app/controller/LocController');
const Validation = require('../app/validation/loc');
module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/',Validation,LocController.create,);
  routes.put('/:loc_id', LocController.update);
  routes.delete('/:loc_id', LocController.delete);
  routes.get('/', LocController.find);
  server.use(prefix, routes);
  
};