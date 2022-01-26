const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload){
    return CarSchema.create(payload);
  }
  async find(payload){
    return CarSchema.find(payload,'-_id -__v');
  }
  async delete(id) {
    return CarSchema.deleteOne({ _id: id });
  }

  async findId(id) {
    return CarSchema.findOne({ _id: id });
  }
  async findall(){
    return CarSchema.find();
  }
  async update(id, payload) {
    await CarSchema.updateOne({ car_id: id }, payload);
    return CarSchema.findOne({ car_id: id });
  }    
}
module.exports = new CarRepository;