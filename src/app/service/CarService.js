const CarRepository = require('../repository/CarRepository');

class CarService{
  async create(payload){
    const data = await CarRepository.create(payload);
    return data;
  }    
}
module.exports = new CarService;