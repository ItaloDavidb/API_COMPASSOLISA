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
    let object = query;
    const data = await CarRepository.find(object);
    if(data.Veiculos.length === 0)throw new NotFound('Object');
    return data;
  }
  validateobj(obj,type){
    if(typeof obj === 'undefined'){
      const objobj = {};
      return objobj;
    }else{
      const objobj2 = {[type]:obj};
      return objobj2;
    }
  }
  
}
module.exports = new CarService;