const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
  async create(payload){
    return PeopleSchema.create(payload);
  }
  async finda(payload){
    return await PeopleSchema.findOne(payload).select('+senha');

  }
  async find(payload){
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Pessoas',
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
    return PeopleSchema.paginate(payload,options,{});
  }
  async delete(id) {
    return PeopleSchema.deleteOne({ _id: id });
  }
  async findId(id) {
    return PeopleSchema.findOne({ _id: id });
  }

  async update(id, payload) {
    await PeopleSchema.updateOne({ people_id: id }, payload);
    return PeopleSchema.findOne({ people_id: id });
  }    
}
module.exports = new PeopleRepository; 