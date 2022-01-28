const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
  async create(payload){
    return PeopleSchema.create(payload);
  }
  async find(payload){
    return PeopleSchema.paginate(payload,' -__v');
  }
  async delete(id) {
    return PeopleSchema.deleteOne({ _id: id });
  }

  async findId(id) {
    return PeopleSchema.paginate({ _id: id });
  }
  async findAll(){
    return PeopleSchema.paginate();
  }
  async update(id, payload) {
    await PeopleSchema.updateOne({ people_id: id }, payload);
    return PeopleSchema.findOne({ people_id: id });
  }    
}
module.exports = new PeopleRepository; 