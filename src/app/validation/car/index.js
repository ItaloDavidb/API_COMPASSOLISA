const JoiImport = require('joi');
const DateExtension = require('@joi/date');


const Joi = JoiImport.extend(DateExtension);

module.exports = async (req,res,next) => {
  try{
    let acessorios = Joi.object().keys({
      descricao: Joi.string().trim().min(1).required()
    });
    const carSchema = Joi.object({
      modelo: Joi.string().min(3).max(30).trim().required(),
      cor: Joi.string().min(3).max(30).trim().required(),
      ano: Joi.date().format('YYYY').raw().max('1-1-2022').greater('1-1-1950').required(),
      acessorios: Joi.array().items(acessorios).min(1).unique('descricao'),
      quantidadePassageiros: Joi.number().required()
    });
    const {error} = await carSchema.validate(req.body,{abortEarly:true});
    if(error) throw error;
    return next();
  }catch(error){
    return res.status(400).json({
      'description': error.details[0].path[0],
      'name':error.message
    });
  }
};