const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const validation = Joi.object({
      people_id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .min(24)
        .max(24)
        .trim()
        .required()
    });
    const { error } = await validation.validate(req.params, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      description: 'Invalid ObjectId',
      name: error.message
    });
  }
};
