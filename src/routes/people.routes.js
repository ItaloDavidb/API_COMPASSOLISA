const PeopleController = require('../app/controller/PeopleController');
const Validation = require('../app/validation/people');
module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/',Validation,PeopleController.create);
  routes.get('/', PeopleController.find);
  routes.get('/:people_id',PeopleController.findId );
  routes.put('/:people_id', PeopleController.update);
  routes.delete('/:people_id',PeopleController.delete);
  server.use(prefix, routes);
  
};