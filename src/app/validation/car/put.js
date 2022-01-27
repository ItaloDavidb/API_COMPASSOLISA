const JoiImport = require('joi');
const DateExtension = require('@joi/date');


const Joi = JoiImport.extend(DateExtension);

module.exports = async (req,res,next) => {
  try{
    let acessorios = Joi.object().keys({
      descricao: Joi.string().required().trim().min(1)
    });
    const carSchema = Joi.object({
      modelo: Joi.string().min(3).max(30).trim(),
      cor: Joi.string().min(3).max(30).trim(),
      ano: Joi.date().format('YYYY').raw().max('1-1-2022').greater('1-1-1950'),
      acessorios: Joi.array().items(acessorios).min(1).unique('descricao'),
      quantidadePassageiros: Joi.number()
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