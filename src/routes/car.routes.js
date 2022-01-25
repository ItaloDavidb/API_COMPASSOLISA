module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/',);
  routes.get('/', ()=> console.log('salve'));
  routes.put('/:car_id', );
  routes.delete('/:car_id',);
  server.use(prefix, routes);
  
};