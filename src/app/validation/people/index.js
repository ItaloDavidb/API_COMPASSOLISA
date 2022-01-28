const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const Joi = JoiImport.extend(DateExtension);
module.exports = async (req,res,next) => {
  function isOver18(dateOfBirth) {
    // find the date 18 years ago
    const date18YrsAgo = new Date();
    date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
    // check if the date of birth is before that date
    return dateOfBirth <= date18YrsAgo;
  }
  if(isOver18(new Date(req.body.data_nascimento)) === false){
    return res.status(400).json({
      'message': 'bad request',
      'details':[
        {
          'message':'you need to be over 18 years old ',
        }
      ]
    });
  }
  try{
    const carSchema = Joi.object({
      nome: Joi.string().min(3).max(30).required().trim(),
      cpf: Joi.string().required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').required(),
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