const PeopleRepository = require('../repository/PeopleRepository');
const NotFound = require('../../errors/NotFound');
class PeopleService{
  async create(payload){ 
    const Cpfvalidate = await PeopleRepository.find({cpf:payload.cpf});
    if( Cpfvalidate.Pessoas.length > 0){
      throw new Error('Cpf already exists');
    }
    const data = await PeopleRepository.create(payload);
    return data;
  }   
  async findAuth(payload){
    return await PeopleRepository.findAuth(payload);
  }
  async findId(id) {
    return PeopleRepository.findId(id);
  }
  async delete(id) {
    return PeopleRepository.delete(id);
  }
  async update(id, payload) {
    const data = await PeopleRepository.update(id, payload);
    return data;
  }
 
  async find(query){
    let object = query;
    const data = await PeopleRepository.find(object);
    if(data.Pessoas.length === 0)throw new NotFound('Object');
    return data;
  }
  validateobj(obj,type){
    if(typeof obj === 'undefined'){
      const objobj = {};
      return objobj;
    }else{
      const objobj2 = {[type]:obj};
      return objobj2;
    }
  }
}
module.exports = new PeopleService;