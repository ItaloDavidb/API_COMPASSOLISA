const PeopleService = require('../service/PeopleService');

class PeopleController{
  async create(req,res){
    try {
      const data = await PeopleService.create(req.body);
      return res.status(201).json({
        'pessoas':{
          '_id': data._id,
          'nome': data.nome,
          'cpf': data.cpf,
          'ano':data.ano,
          'data_nascimento':data.data_nascimento,
          'senha':data.senha,
          'habilitado':data.habilitado
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
    const id = req.params.people_id;
    try {
      
      const data = await PeopleService.findId({_id:id});
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
  async delete(req,res){
    const id = req.params.people_id;
    try {
      const people = await PeopleService.findId(id);
      console.log(people);
      if(people === null){
        res.status(404).json({
          'message': 'bad request',
          'details':[
            {
              'message':'Id not Found',
            }
          ]
        });
      }
      await PeopleService.delete(id);
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
    const id = req.params.people_id;
    const newData = req.body;
    try {
      const people = await PeopleService.findId(id);
      if(people === null){
        res.status(404).json({
          'message': 'bad request',
          'details':[
            {
              'message':'Id not Found',
            }
          ]
        });
      }
      const updatedPeople = await PeopleService.update(id, newData);
      res.status(200).json(updatedPeople);
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
      const {nome,cpf,data_nascimento,email,habilitado} = req.query;
      const data = await PeopleService.find(nome,cpf,data_nascimento,email,habilitado);
      return res.status(200).json(data);
      
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
  


module.exports = new PeopleController;