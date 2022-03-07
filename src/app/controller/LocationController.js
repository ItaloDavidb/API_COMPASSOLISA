const LocationService = require('../service/LocationService');

class CarController {
  async create(req, res) {
    try {
      const data = await LocationService.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async findId(req, res) {
    const id = req.params.car_id;
    try {
      const Car = await LocationService.findId({ _id: id });
      return res.status(200).json({
        Veiculos: Car
      });
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
      const data = await LocationService.find(query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async delete(req, res) {
    const id = req.params.car_id;
    try {
      await LocationService.delete(id);
      return res.status(204).end();
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async update(req, res) {
    const id = req.params.car_id;
    const newData = req.body;
    try {
      const updatedCar = await LocationService.update(id, newData);
      return res.status(200).json(updatedCar);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async patch(req, res) {
    const { car_id, acessorios_id } = req.params;
    const newData = req.body;
    try {
      const data = await LocationService.patch(car_id, acessorios_id, newData);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new CarController();
