const PeopleRepository = require('../repository/PeopleRepository');
class PeopleService{
  async create(payload){ 
    const Cpfvalidate = await PeopleRepository.find({cpf:payload.cpf});
    if( Cpfvalidate.docs.length > 0){
      throw new Error('Cpf already exists');
    }
    const data = await PeopleRepository.create(payload);
    return data;
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
 
  async find(nome,cpf,data_nascimento,email,habilitado){
    let data = {};
    if(typeof nome === 'undefined' && 
    typeof cpf === 'undefined' &&
    typeof data_nascimento === 'undefined' &&
    typeof email === 'undefined' &&
    typeof habilitado === 'undefined'
    ){
      data = await PeopleRepository.find();
    }else{
      const objnome = this.validateobj(nome,'nome');
      const objcpf = this.validateobj(cpf,'cpf');
      const objdata_nascimento = this.validateobj(data_nascimento,'data_nascimento');
      const objemail = this.validateobj(email,'email');
      const objquantidadP = this.validateobj(habilitado,'habilitado');
      const obj = Object.assign({},objnome,objcpf,objdata_nascimento,objemail, objquantidadP);
      data = await PeopleRepository.find(obj);
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
module.exports = new PeopleService;