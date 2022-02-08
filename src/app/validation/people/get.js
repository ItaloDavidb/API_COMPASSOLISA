const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const  {isValidCpf} = require('../../helper/Validations');
const ENUM = require('../../helper/ENUM');
const Joi = JoiImport.extend(DateExtension);
module.exports = async (req,res,next) => {
  try{
    const carSchema = Joi.object({
      nome: Joi.string().min(3).max(30).trim(),
      cpf: Joi.string().min(14).max(14).trim().custom((value,help)=>{
        if(isValidCpf(value) === false){
          return help.message('Invalid Cpf');
        }else{
          return true;
        }
      }),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900'),
      email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow:ENUM.Email } }),
      senha: Joi.string().trim().min(6),
      habilitado: Joi.string().trim().valid(...Object.values(ENUM.habilitado))
    });
    const {error} = await carSchema.validate(req.query,{abortEarly:true});
    if(error) throw error;
    return next();
  }catch(error){
    return res.status(400).json({
      'description': error.details[0].path[0],
      'name':error.message
    });
  }
};