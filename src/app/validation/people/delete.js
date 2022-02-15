const Joi = require('joi-oid');
module.exports = async (req,res,next) =>{
  try {
    const validation = Joi.object({
      people_id: Joi.objectId()
    });
    const {error} = await validation.validate(req.params,{abortEarly:true});
    if(error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      'description': error.details[0].path[0],
      'name':error.message
    });
              
  }
};