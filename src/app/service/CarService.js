const CarRepository = require('../repository/CarRepository');
const NotFound = require('../../errors/NotFound');

class CarService{
  async create(payload){
    const data = await CarRepository.create(payload);
    return data;
  }   
  async findId(id) {
    const data =  CarRepository.findId(id);
    if(typeof data === 'undefined') ()=> {throw new Error('Id not Found');};
    return data;
  }
  
  async delete(id) {
    return CarRepository.delete(id);
  }
  async update(id, payload) {
    const data = await CarRepository.update(id, payload);
    return data;
  }
 
  async find(query){
    let payload = query;
    const data = await CarRepository.find(payload);
    if(data.Veiculos.length === 0)throw new NotFound(payload.query);
    return data;
  }
  async patch (car_id, acessorios_id, payload) {
    const result = await CarRepository.patch(car_id, acessorios_id, payload);
	
    return result;
  }
}
module.exports = new CarService;