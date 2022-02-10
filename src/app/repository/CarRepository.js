const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload){
    return CarSchema.create(payload);
  }
  async find(payload){
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Veiculos',
      page: 'offset',
      nextPage: false,
      prevPage: false,
      totalPages: 'offsets',
      pagingCounter: false,
      meta: false,
      hasPrevPage: false,
      hasNextPage: false
    };
    const options = {
      page: 1,
      limit: 100,
      customLabels: myCustomLabels
    };
    return CarSchema.paginate(payload,options,{});
  }
  async delete(id) {
    return CarSchema.deleteOne({ _id: id });
  }

  async findId(id) {
    return CarSchema.findOne({ _id: id });
  }
  async update(id, payload) {
    await CarSchema.updateOne({ car_id: id }, payload);
    return CarSchema.findOne({ car_id: id });
  }
  async patch(car_id, acessorios_id, payload) {
    return CarSchema.findByIdAndUpdate(
      car_id, 
      { $set: {'acessorios.$[outer].descricao': payload.descricao} },
      { arrayFilters: [{'outer._id': acessorios_id }] }
    );
  }
}    

module.exports = new CarRepository;