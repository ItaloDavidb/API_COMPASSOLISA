const LocationRepository = require('../repository/LocationRepository');
const NotFound = require('../../errors/Error/notfound');

class CarService {
  async create(payload) {
    const data = await LocationRepository.create(payload);
    return data;
  }

  async findId(id) {
    const data = LocationRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return data;
  }

  async delete(id) {
    const data = LocationRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return LocationRepository.delete(id);
  }

  async update(id, payload) {
    const data = LocationRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return LocationRepository.update(id, payload);
  }

  async find(query) {
    const data = await LocationRepository.find(query);
    return data;
  }
}
module.exports = new CarService();
