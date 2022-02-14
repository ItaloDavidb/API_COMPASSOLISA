const PeopleRepository = require('../repository/PeopleRepository');
const NotFound = require('../../errors/NotFound');
class PeopleService{
  async create(payload){ 
    const Cpfvalidate = await PeopleRepository.find({cpf:payload.cpf});
    const Emailvalidate = await PeopleRepository.find({email:payload.email});
    if( Cpfvalidate.Pessoas.length > 0){
      throw new Error('Conflict: Cpf already exists'
      );
    }
    if( Emailvalidate.Pessoas.length > 0){
      throw new Error('Conflict: Email already exists');
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
    let payload = query;
    const data = await PeopleRepository.find(payload);
    if(data.Pessoas.length === 0)throw new NotFound(payload.query);
    return data;
  }
}
module.exports = new PeopleService;