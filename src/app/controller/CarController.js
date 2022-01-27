const CarService = require('../service/CarService');

class CarController{
  async create(req,res){
    try {
      const data = await CarService.create(req.body);
      return res.status(201).json({
        'veiculos':{
          '_id': data._id,
          'modelo': data.modelo,
          'cor': data.cor,
          'ano':data.ano,
          'acessorios':data.acessorios,
          'quantidadePassageiros':data.quantidadePassageiros   
        }});
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
      
      const data = await CarService.findId({_id:id});
      if(data === null){
        return res.status(404).json({
          'message': 'bad request',
          'details':[
            {
              'message':'ID not Found',
            }
          ]
        });
      }
      
      return res.status(200).json({
        'veiculos':data
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
      const cor1 = req.query.cor;
      const modelo1 = req.query.modelo;
      const ano1 = req.query.ano;
      const acessorios1 = req.query.acessorios;
      const quantidadePassageiros1 = req.query.quantidadePassageiros;
      const data = await CarService.find(cor1,modelo1,ano1,acessorios1,quantidadePassageiros1);
      return res.status(200).json({
        'veiculos':data
        
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
  async delete(req,res){
    const id = req.params.car_id;
    try {
      const Car = await CarService.findId(id);
      if(Car === null){
        res.status(404).json({
          'message': 'bad request',
          'details':[
            {
              'message':'Id not Found',
            }
          ]
        });
      }
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
      if(Car === null){
        res.status(404).json({
          'message': 'bad request',
          'details':[
            {
              'message':'Id not Found',
            }
          ]
        });
      }
      const updatedEmployee = await CarService.update(id, newData);
      res.status(200).json(updatedEmployee);
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
