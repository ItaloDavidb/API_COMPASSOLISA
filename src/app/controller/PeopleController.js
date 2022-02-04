const PeopleService = require('../service/PeopleService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth.json');
const NotFound = require('../../errors/NotFound');
class PeopleController{
  async authenticate(req,res){
    const {email,senha} = req.body;
    const data = await PeopleService.findAuth({email});
    if(!data)
      return res.status(400).send({error:'Resgistration Failed'});
    if(!await bcrypt.compare(senha,data.senha))
      return res.status(400).send({error:'Invalid Password'});
    data.senha = undefined;

    const token = jwt.sign({id:data.id}, auth.secret,{
      expiresIn:86400
    });
    res.send({data,token});  
  }
  async create(req,res){
    try {
      const data = await PeopleService.create(req.body);
      data.senha = undefined;
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
    const id = req.params.people_id;
    try {
      
      const people = await PeopleService.findId({_id:id});
      if(people === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
      
      return res.status(200).json({
        'veiculos':people
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
      if(people === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
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
      if(people === null) 
        res.status(404).send(new NotFound(`ID: ${id}`));
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
    try{
      const {... query} = req.query;
      const data = await PeopleService.find(query);
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
}
  


module.exports = new PeopleController;