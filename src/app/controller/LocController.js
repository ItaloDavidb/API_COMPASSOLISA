const LocService = require('../service/LocService');
const NotFound = require('../../errors/NotFound');
class LocController {
  async create(req, res){
    const payload = req.body;
    try {
      const data = await LocService.create(payload);
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
  async findId(req,res){
    const id = req.params.loc_id;
    try {
      
      const Loc = await LocService.findId({_id:id});
      if(Loc === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
      
      return res.status(200).json({
        'Locadoras':Loc
      });
      
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
  async update(req,res){
    const id = req.params.loc_id;
    const newData = req.body;
    try {
      const loc = await LocService.findId(id);
      if(loc === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
      const updatedloc = await LocService.update(id, newData);
      res.status(200).json(updatedloc);
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
  async delete(req,res){
    const id = req.params.loc_id;
    try {
      const Loc = await LocService.findId(id);
      if(Loc === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
      await LocService.delete(id);
      res.status(204).end();

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
}

module.exports = new LocController;