const JoiImport = require('joi');
const DateExtension = require('@joi/date');


const Joi = JoiImport.extend(DateExtension);

module.exports = async (req,res,next) => {
  try{
    const carSchema = Joi.object({
      modelo: Joi.string().min(3).max(30),
      cor: Joi.string().min(3).max(30),
      ano: Joi.date().format('YYYY').raw().max('1-1-2022').greater('1-1-1950'),
      quantidadePassageiros: Joi.number()
    });
    const {error} = await carSchema.validate(req.query,{abortEarl:true});
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