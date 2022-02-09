const LocRepository = require('../repository/LocRepository');
const NotFound = require('../../errors/NotFound');

class LocService{
  async create(payload){
    const data = await LocRepository.create(payload);
    return data;
  }
  async find(query){
    let payload = query;
    const data = await LocRepository.find(payload);
    if(data.Locadoras.length === 0)throw new NotFound(payload.query);
    return data;
  }
}
module.exports = new LocService;
  
