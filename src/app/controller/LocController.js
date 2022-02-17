const LocService = require('../service/LocService');

class LocController {
  async create(req, res) {
    const payload = req.body;
    try {
      const data = await LocService.create(payload);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async findId(req, res) {
    const id = req.params.loc_id;
    try {
      const Loc = await LocService.findId({ _id: id });
      return res.status(200).json({
        Locadoras: Loc
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
      const data = await LocService.find(query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async update(req, res) {
    const id = req.params.loc_id;
    const newData = req.body;
    try {
      const updatedloc = await LocService.update(id, newData);
      return res.status(200).json(updatedloc);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async delete(req, res) {
    const id = req.params.loc_id;
    try {
      await LocService.delete(id);
      return res.status(204).end();
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new LocController();
