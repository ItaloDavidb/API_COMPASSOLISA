const PeopleRepository = require('../repository/PeopleRepository');
function isValidCPF(cpf) {
  if (typeof cpf !== 'string') return false;
  cpf = cpf.replace(/[\s.-]*/igm, '');
  if (
    !cpf ||
        cpf.length != 11 ||
        cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999' 
  ) {
    return false;
  }
  var soma = 0;
  var resto;
  for (let i = 1; i <= 9; i++) 
    soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11))  resto = 0;
  if (resto != parseInt(cpf.substring(9, 10)) ) return false;
  soma = 0;

  for (let i = 1; i <= 10; i++) 
    soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11))  resto = 0;
  if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
  return true;
  

}
class PeopleService{
  async create(payload){
    
    if(isValidCPF(payload.cpf) === false)  {throw new Error('Cpf Invalido');} 
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
      const objemail2 = {email:email.descricao};
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