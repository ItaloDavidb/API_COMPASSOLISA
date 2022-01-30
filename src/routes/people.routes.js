const PeopleController = require('../app/controller/PeopleController');
const Validation = require('../app/validation/people');
const ValidationDelet= require('../app/validation/people/delete');
const ValidationGet = require('../app/validation/people/get');
module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/',Validation,PeopleController.create);
  routes.post('/authenticate',PeopleController.authenticate);
  routes.get('/',ValidationGet ,PeopleController.find);
  routes.get('/:people_id',ValidationDelet,ValidationGet,PeopleController.findId );
  routes.put('/:people_id', Validation,ValidationDelet,PeopleController.update);
  routes.delete('/:people_id',ValidationDelet,PeopleController.delete);
  server.use(prefix, routes);
  
};