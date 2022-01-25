const CarRepository = require('../repository/CarRepository');

class CarService{
  async create(payload){
    const data = await CarRepository.create(payload);
    return data;
  }
  async find(payload){
    const data = await CarRepository.find(payload);
    return data;
  }    
}
module.exports = new CarService;