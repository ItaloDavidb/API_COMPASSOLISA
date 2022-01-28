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
  async findIdP(id){
    return PeopleRepository.findIdP(id);
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
      data = await PeopleRepository.findAll();
    }else{
      const objnome = this.validatenome(nome);
      const objcpf = this.validatecpf(cpf);
      const objdata_nascimento = this.validatedata_nascimento(data_nascimento);
      const objemail = this.validateemail(email);
      const objhabilitado = this.validatehabilitado(habilitado);
      const obj = Object.assign({},objnome,objcpf,objdata_nascimento,objemail, objhabilitado);
      data = await PeopleRepository.find(obj);
    }
    return data;
  }
  validatenome(nome){
    if(typeof nome === 'undefined'){
      const objnome = {};
      return objnome;
    }else{
      const objnome2 = {nome:nome};
      return objnome2;
    }
  }
  validatecpf(cpf){
    if(typeof cpf === 'undefined'){
      const objcpf = {};
      return objcpf;
    }else{
      const objcpf2 = {cpf:cpf};
      return objcpf2;
    }
  }
  validatedata_nascimento(data_nascimento){
    if(typeof data_nascimento === 'undefined'){
      const objdata_nascimento = {};
      return objdata_nascimento;
    }else{
      const objdata_nascimento2 = {data_nascimento:data_nascimento};
      return objdata_nascimento2;
    }
  }
  validateemail(email){
    if(typeof email === 'undefined'){
      const objemail = {};
      return objemail;
    }else{
      const objemail2 = {email:email};
      return objemail2;
    }
  } 
  validatehabilitado(habilitado){
    if(typeof habilitado === 'undefined'){
      const objhabilitado = {};
      return objhabilitado;
    }else{
      const objhabilitado2 = {habilitado:habilitado};
      return objhabilitado2;
    }
  } 
  
}
module.exports = new PeopleService;