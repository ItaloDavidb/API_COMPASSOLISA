const LocService = require('../service/LocService');
const NotFound = require('../../errors/NotFound');
class LocController {
  async create(req,res){
    try {
      const data = await LocService.create(req.body);
      return res.status(201).json(data);
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
  }
  async find(req,res){
    try {
      const {... query} = req.query;
      const data = await LocService.find(query);
      return res.status(200).json(data);  
      
    } catch (error) {
      return error;
    }
  }
}

module.exports = new LocController;