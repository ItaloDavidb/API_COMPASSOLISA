const Joi = require('joi');
module.exports = async (req,res,next) =>{
  try {
    const validation = Joi.object({
      people_id: Joi.string().min(24).max(24).required()
    });
    const {error} = await validation.validate(req.params,{abortEarly:true});
    if(error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      'message': 'bad request',
      'details':[
        {
          'message':'The id must be Type of ObjectId',
        }
      ]
    });
              
  }
};