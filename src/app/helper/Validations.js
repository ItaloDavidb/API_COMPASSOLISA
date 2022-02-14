
function isValidCpf(cpf) {
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
function isOver18(dateOfBirth) {
  const date18YrsAgo = new Date();
  date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
  return dateOfBirth <= date18YrsAgo;
}
function isValidCNPJ(cnpj) {

  if (cnpj == '00000000000000' || 
      cnpj == '11111111111111' || 
      cnpj == '22222222222222' || 
      cnpj == '33333333333333' || 
      cnpj == '44444444444444' || 
      cnpj == '55555555555555' || 
      cnpj == '66666666666666' || 
      cnpj == '77777777777777' || 
      cnpj == '88888888888888' || 
      cnpj == '99999999999999')
    return false;
       
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0,size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2)
      pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (result != digits.charAt(0))
    return false;
       
  size = size + 1;
  numbers = cnpj.substring(0,size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2)
      pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (result != digits.charAt(1))
    return false;
         
  return true;
  
}
module.exports = {
  isValidCpf:isValidCpf,
  isOver18:isOver18,
  isValidCNPJ:isValidCNPJ
};
