const Joi = require('joi');
module.exports = async (req, res, next) => {
  try {
    let endereco = Joi.object().keys({
      cep: Joi.string().min(8).max(8).trim(),
      number: Joi.string().min(1).trim(),
      complemento: Joi.string().min(3).max(30).trim(),
      isFilial: Joi.boolean()
    });
    const schema = Joi.object({
      nome: Joi.string().trim().min(3).max(20),
      cnpj: Joi.string().trim().min(14).max(18),
      atividades: Joi.string().min(5).max(40).trim(),
      endereco: Joi.array().items(endereco).min(1).unique('cep'),
    });
    const { error } = await schema.validate(req.query, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      'description': error.details[0].path[0],
      'name':error.message
    });
  }
};