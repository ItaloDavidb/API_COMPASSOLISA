const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const Joi = JoiImport.extend(DateExtension);
const  {isOver18, isValidCpf} = require('../../helper/Validations');
const ENUM = require('../../helper/ENUM');
module.exports = async (req,res,next) => {
  try{
    const carSchema = Joi.object({
      nome: Joi.string().min(3).max(30).trim().required(),
      cpf: Joi.string().min(14).max(14).trim().custom((value,help)=>{
        if(isValidCpf(value) === false){
          return help.message('Invalid Cpf');
        }else{
          return true;
        }
      }).required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').required()
        .custom((value,help)=>{
          if(isOver18(new Date(value)) === false){
            return help.message('You need to be ove 18 years old');
          }
        }).required(),
      email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow:ENUM.email } }).required(),
      senha: Joi.string().trim().min(6).required(),
      habilitado: Joi.string().trim().valid(...Object.values(ENUM.habilitado)).required()
    });
    const {error} = await carSchema.validate(req.body,{abortEarly:true});
    if(error) throw error;
    return next();
  }catch(error){
    return res.status(400).json({
      'message': 'bad request',
      'details':[
        {
          'message':error.message,
        }
      ]
    });
  }
};