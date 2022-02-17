const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const endereco = Joi.object().keys({
      cep: Joi.string().min(8).max(8).trim().required(),
      number: Joi.string().min(1).trim().required(),
      complemento: Joi.string().min(3).max(30).trim(),
      isFilial: Joi.boolean().required()
    });
    const schema = Joi.object({
      nome: Joi.string().trim().min(3).max(20).required(),
      cnpj: Joi.string().trim().min(14).max(18).required(),
      atividades: Joi.string().min(5).max(40).trim().required(),
      endereco: Joi.array().items(endereco).min(1).unique('cep').unique('isFilial').required()
    });
    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      description: error.details[0].path[0],
      name: error.message
    });
  }
};
