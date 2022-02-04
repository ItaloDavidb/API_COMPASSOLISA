const CarService = require('../service/CarService');
const NotFound = require('../../errors/NotFound');
class CarController{
  async create(req,res){
    try {
      const data = await CarService.create(req.body);
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
    const id = req.params.car_id;
    try {
      
      const Car = await CarService.findId({_id:id});
      if(Car === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
      
      return res.status(200).json({
        'veiculos':Car
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
    try{
      const {... query} = req.query;
      const data = await CarService.find(query);
      return res.status(200).json(data);  
    }catch(error){
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
    const id = req.params.car_id;
    try {
      const Car = await CarService.findId(id);
      if(Car === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
      await CarService.delete(id);
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
  async update(req,res){
    const id = req.params.car_id;
    const newData = req.body;
    try {
      const Car = await CarService.findId(id);
      if(Car === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
      
      
      const updatedCar = await CarService.update(id, newData);
      res.status(200).json(updatedCar);
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

module.exports = new CarController;
