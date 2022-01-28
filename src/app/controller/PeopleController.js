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
}
module.exports = new PeopleController;