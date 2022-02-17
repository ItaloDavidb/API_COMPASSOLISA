const CarRepository = require('../repository/CarRepository');
const NotFound = require('../../errors/Error/notfound');

class CarService {
  async create(payload) {
    const data = await CarRepository.create(payload);
    return data;
  }

  async findId(id) {
    const data = CarRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return data;
  }

  async delete(id) {
    return CarRepository.delete(id);
  }

  async update(id, payload) {
    const data = await CarRepository.update(id, payload);
    return data;
  }

  async find(query) {
    const data = await CarRepository.find(query);
    if (data.Pessoas.length === 0) throw new NotFound(query);
    return data;
  }

  async patch(car_id, acessorios_id, payload) {
    const result = await CarRepository.patch(car_id, acessorios_id, payload);

    return result;
  }
}
module.exports = new CarService();
