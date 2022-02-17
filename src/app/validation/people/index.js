const JoiImport = require('joi');
const DateExtension = require('@joi/date');

const Joi = JoiImport.extend(DateExtension);
const ENUM = require('../../helper/ENUM');

module.exports = async (req, res, next) => {
  try {
    const PeopleSchema = Joi.object({
      nome: Joi.string().min(3).max(30).trim().required(),
      cpf: Joi.string().max(14).trim().required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').required().required(),
      email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: ENUM.email } })
        .required(),
      senha: Joi.string().trim().min(6).required(),
      habilitado: Joi.string()
        .trim()
        .valid(...Object.values(ENUM.habilitado))
        .required()
    });
    const { error } = await PeopleSchema.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      description: error.details[0].path[0],
      name: error.message
    });
  }
};
