const LocSchema = require('../schema/LocSchema');

class LocRepository {
  async create(payload){
    return LocSchema.create(payload);
  }
  async find(payload){
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Locadoras',
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
    return LocSchema.paginate(payload,options,{});
  }
  async findId(id) {
    return LocSchema.findOne({ _id: id });
  }
  async delete(id) {
    return LocSchema.deleteOne({ _id: id });
  }
  async update(id, payload) {
    await LocSchema.updateOne({ car_id: id }, payload);
    return LocSchema.findOne({ car_id: id });
  }
  
}
module.exports = new LocRepository;