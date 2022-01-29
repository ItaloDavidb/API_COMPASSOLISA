const CarRepository = require('../repository/CarRepository');

class CarService{
  async create(payload){
    const data = await CarRepository.create(payload);
    return data;
  }   
  async findId(id) {
    const data =  CarRepository.findId(id);
    if(typeof data === 'undefined') ()=> {throw new Error('Id not Found');};
    return data;
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
      data = await CarRepository.find();
    }else{
      const objcor = this.validateobj(cor,'cor');
      const objmodelo = this.validateobj(modelo,'modelo');
      const objano = this.validateobj(ano,'ano');
      const objacessorios = this.validateobj(acessorios,'acessorios');
      const objquantidadP = this.validateobj(quantidadePassageiros,'quantidadePassageiros');
      const obj = Object.assign({},objcor,objmodelo,objano,objacessorios, objquantidadP);
      data = await CarRepository.find(obj);
    }
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
module.exports = new CarService;