const Joi = require('joi-oid');
module.exports = async (req,res,next) =>{
  try {
    const validation = Joi.object({
      car_id: Joi.objectId()
    });
    const {error} = await validation.validate(req.params,{abortEarl:true});
    if(error) throw error;
    return next();
  } catch (error) {
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