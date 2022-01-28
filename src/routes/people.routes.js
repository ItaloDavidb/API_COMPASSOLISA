const PeopleController = require('../app/controller/PeopleController');
const Validation = require('../app/validation/people');
module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/',Validation,PeopleController.create);
  routes.get('/', );
  routes.get('/:people_id', );
  routes.put('/:people_id', );
  routes.delete('/:people_id',);
  server.use(prefix, routes);
  
};