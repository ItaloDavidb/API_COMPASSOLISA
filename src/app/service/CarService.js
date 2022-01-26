const CarRepository = require('../repository/CarRepository');

class CarService{
  async create(payload){
    const data = await CarRepository.create(payload);
    return data;
  }   
  async findId(id) {
    return CarRepository.findId(id);
  }
  async delete(id) {
    return CarRepository.delete(id);
  }
  async update(id, payload) {
    const data = await CarRepository.update(id, payload);
    return data;
  }
  async find(modelo,cor,ano,acessorios,quantidadePassageiros){
    let data = {};
    if(typeof modelo === 'undefined' && cor === 'undefined' && 
    ano === 'undefined' && acessorios === 'undefined' && 
    quantidadePassageiros === undefined ){
      data = await CarRepository.findAll();
    }
    else{
      const Objmodelo = this.validatemodelo(modelo);
      const Objcor = this.validatecor(cor);
      const Objano = this.validateano(ano);
      const Objacessorios = this.validateacessorios(acessorios);
      const ObjPassageiros = this.validatePassageiros(quantidadePassageiros);
      const obj = Object.assign({},Objmodelo,Objcor,Objano,Objacessorios,ObjPassageiros);
      data = await CarRepository.find(obj);
    }
    return data;
    
  } 
  validatemodelo(modelo) {
    if (typeof modelo === 'undefined') {
      const ObjName = {};
      return ObjName;
    } else {
      const ObjName2 = { name: { $regex: '.*' + modelo + '.*' } };
      return ObjName2;
    }
  }
  validatecor(cor) {
    if (typeof cor === 'undefined') {
      const ObjName = {};
      return ObjName;
    } else {
      const ObjName2 = { name: { $regex: '.*' + cor + '.*' } };
      return ObjName2;
    }
  }
  validateano(ano) {
    if (typeof ano === 'undefined') {
      const ObjName = {};
      return ObjName;
    } else {
      const ObjName2 = { name: { $regex: '.*' + ano + '.*' } };
      return ObjName2;
    }
  }
  validateacessorios(acessorios) {
    if (typeof acessorios === 'undefined') {
      const ObjName = {};
      return ObjName;
    } else {
      const ObjName2 = { name: { $regex: '.*' + acessorios + '.*' } };
      return ObjName2;
    }
  }
  validatePassageiros(quantidadePassageiros) {
    if (typeof quantidadePassageiros === 'undefined') {
      const ObjName = {};
      return ObjName;
    } else {
      const ObjName2 = { name: { $regex: '.*' + quantidadePassageiros + '.*' } };
      return ObjName2;
    }
  }
}
module.exports = new CarService;