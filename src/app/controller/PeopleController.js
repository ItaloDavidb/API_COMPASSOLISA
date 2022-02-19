const PeopleService = require('../service/PeopleService');

// const NotFound = require('../../errors/NotFound');

class PeopleController {
  async authenticate(req, res) {
    try {
      const data = await PeopleService.authenticate(req.body);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const data = await PeopleService.create(req.body);
      data.senha = undefined;
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async findId(req, res) {
    const id = req.params.people_id;
    try {
      const people = await PeopleService.findId({ _id: id });
      return res.status(200).json({
        Pessoas: people
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async delete(req, res) {
    const id = req.params.people_id;
    try {
      await PeopleService.delete(id);
      return res.status(204).end();
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async update(req, res) {
    const id = req.params.people_id;
    const newData = req.body;
    try {
      const updatedPeople = await PeopleService.update(id, newData);
      return res.status(200).json(updatedPeople);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async find(req, res) {
    try {
      const { ...query } = req.query;
      const data = await PeopleService.find(query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new PeopleController();
