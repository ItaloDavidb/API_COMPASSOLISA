const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const Joi = JoiImport.extend(DateExtension);
const isValidcpf = require('./isValidcpf');
const isOver18 = require('./isOver18');
module.exports = async (req,res,next) => {
  try{
    const carSchema = Joi.object({
      nome: Joi.string().min(3).max(30).required().trim(),
      cpf: Joi.string().min(14).max(14).required().custom((value,help)=>{
        if(isValidcpf(value) === false){
          return help.message('Cpf invalido');
        }else{
          return true;
        }
      }),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').required()
        .custom((value,help)=>{
          if(isOver18(new Date(value)) === false){
            return help.message('You need tobe ove 18 years old');
          }
        }),
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','br'] } }),
      senha: Joi.string().required().min(6),
      habilitado: Joi.string().required().valid('sim','não')
    });
    const {error} = await carSchema.validate(req.body,{abortEarl:true});
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