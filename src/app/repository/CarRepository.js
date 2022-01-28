
const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload){
    return CarSchema.create(payload);
  }
  async find(payload){
    return CarSchema.paginate(payload,' -__v');
  }
  async delete(id) {
    return CarSchema.deleteOne({ _id: id });
  }

  async findId(id) {
    return CarSchema.paginate({ _id: id });
  }
  async findAll(){
    return CarSchema.paginate();
  }
  async update(id, payload) {
    await CarSchema.updateOne({ car_id: id }, payload);
    return CarSchema.findOne({ car_id: id });
  }    
}
module.exports = new CarRepository;