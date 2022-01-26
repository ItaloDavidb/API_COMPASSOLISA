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
      const modelo = req.query.modelo;
      const cor = req.query.cor;
      const ano = req.query.ano;
      const acessorios = req.query.acessorios;
      const quantidadePassageiros = req.query.quantidadePassageiros;
      const data = await CarService.find(
        modelo,
        cor,
        ano,
        acessorios,
        quantidadePassageiros
      );
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
      return res.status(400).json();
    }
  }
}

module.exports = new CarController;
