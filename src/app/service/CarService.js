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
 
  async find(cor,modelo,ano,acessorios,quantidadePassageiros){
    let data = {};
    if(typeof cor === 'undefined' && 
    typeof modelo === 'undefined' &&
    typeof ano === 'undefined' &&
    typeof acessorios === 'undefined' &&
    typeof quantidadePassageiros === 'undefined'
    ){
      data = await CarRepository.findAll();
    }else{
      const objcor = this.validatecor(cor);
      const objmodelo = this.validatemodelo(modelo);
      const objano = this.validateano(ano);
      const objacessorios = this.validateacessorios(acessorios);
      const objquantidadP = this.validatepassageiros(quantidadePassageiros);
      const obj = Object.assign({},objcor,objmodelo,objano,objacessorios, objquantidadP);
      data = await CarRepository.find(obj);
    }
    return data;
  }
  validatecor(cor){
    if(typeof cor === 'undefined'){
      const objcor = {};
      return objcor;
    }else{
      const objcor2 = {cor:cor};
      return objcor2;
    }
  }
  validatemodelo(modelo){
    if(typeof modelo === 'undefined'){
      const objmodelo = {};
      return objmodelo;
    }else{
      const objmodelo2 = {modelo:modelo};
      return objmodelo2;
    }
  }
  validateano(ano){
    if(typeof ano === 'undefined'){
      const objano = {};
      return objano;
    }else{
      const objano2 = {ano:ano};
      return objano2;
    }
  }
  validateacessorios(acessorios){
    if(typeof acessorios === 'undefined'){
      const objacessorios = {};
      return objacessorios;
    }else{
      const objacessorios2 = {acessorios:acessorios.descricao};
      return objacessorios2;
    }
  } 
  validatepassageiros(passageiros){
    if(typeof passageiros === 'undefined'){
      const objpassageiros = {};
      return objpassageiros;
    }else{
      const objpassageiros2 = {passageiros:passageiros};
      return objpassageiros2;
    }
  } 
  
}
module.exports = new CarService;