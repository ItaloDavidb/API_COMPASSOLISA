const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload){
    return CarSchema.create(payload);
  }
  async find(payload){
    return CarSchema.find(payload);
  }    
}
module.exports = new CarRepository;