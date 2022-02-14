const Joi = require('joi');
const  {isValidCNPJ} = require('../../helper/Validations');
module.exports = async (req, res, next) => {
  try {
    let endereco = Joi.object().keys({
      cep: Joi.string().min(8).max(8).trim().required(),
      number: Joi.string().min(1).trim().required(),
      complemento: Joi.string().min(3).max(30).trim(),
      isFilial: Joi.boolean().required()
    });
    const schema = Joi.object({
      nome: Joi.string().trim().min(3).max(20).required(),
      cnpj: Joi.string().trim().min(14).max(18).custom((value,help)=>{
        if(isValidCNPJ(value) === false){
          return help.message(`'Invalid CNPJ ${value}`);
        }else{
          return true;
        }
      }).required(),
      atividades: Joi.string().min(5).max(40).trim().required(),
      endereco: Joi.array().items(endereco).min(1).unique('cep'),
    });
    const { error } = await schema.validate(req.body, { abortEarl: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      'description': error.details[0].path[0],
      'name':error.message
    });
  }
};