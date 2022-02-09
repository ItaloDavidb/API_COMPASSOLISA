const LocSchema = require('../schema/LocSchema');

class CarRepository {
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
}
module.exports = new CarRepository;