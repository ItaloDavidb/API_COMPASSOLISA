const JoiImport = require('joi');
const DateExtension = require('@joi/date');

const Joi = JoiImport.extend(DateExtension);

module.exports = async (req, res, next) => {
  try {
    const carSchema = Joi.object({
      modelo: Joi.string().trim().min(3).max(30),
      cor: Joi.string().min(3).trim().max(30),
      ano: Joi.date().format('YYYY').raw().max('1-1-2022').greater('1-1-1950'),
      acessorios: Joi.string().trim().min(3).max(30),
      quantidadePassageiros: Joi.number()
    });
    const { error } = await carSchema.validate(req.query, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      description: error.details[0].path[0],
      name: error.message
    });
  }
};
