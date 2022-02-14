const LocRepository = require('../repository/LocRepository');
const NotFound = require('../../errors/NotFound');
const CepFinder = require('../helper/cepFinder');
class LocService{
  async create(payload, data){
    let  j = 0;
    while (j < payload.endereco.length) {
      const NCep = payload.endereco;
      const newAdress = NCep[j];
      const data = await CepFinder.finder(newAdress.cep);
      const { cep, logradouro, complemento, bairro, localidade, uf } = data;
      newAdress.cep = cep;
      newAdress.logradouro = logradouro;
      newAdress.complemento = complemento;
      newAdress.bairro = bairro;
      newAdress.localidade = localidade;
      newAdress.uf = uf;   
      j++;
    }
    const result = await LocRepository.create(payload, data);
    return result;
  }
  async find(query){
    let payload = query;
    const data = await LocRepository.find(payload);
    if(data.Locadoras.length === 0)throw new NotFound(payload.query);
    return data;
  }
  async findId(id) {
    const data =  LocRepository.findId(id);
    if(typeof data === 'undefined') ()=> {throw new Error('Id not Found');};
    return data;
  }
  async delete(id) {
    return LocRepository.delete(id);
  }
  async update(id, payload) {
    const data = await LocRepository.update(id, payload);
    return data;
  }
}
module.exports = new LocService;
  
