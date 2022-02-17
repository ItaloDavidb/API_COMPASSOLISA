const PeopleRepository = require('../repository/PeopleRepository');
const Conflict = require('../../errors/Conflict');
const NotFound = require('../../errors/Error/notfound');

class PeopleService {
  async create(payload) {
    const Cpfvalidate = await PeopleRepository.find({ cpf: payload.cpf });
    const Emailvalidate = await PeopleRepository.find({ email: payload.email });
    if (Cpfvalidate.Pessoas.length > 0) {
      throw new Conflict(payload.cpf);
    }
    if (Emailvalidate.Pessoas.length > 0) {
      throw new Conflict(payload.email);
    }
    const data = await PeopleRepository.create(payload);
    return data;
  }

  async findAuth(payload) {
    return PeopleRepository.findAuth(payload);
  }

  async findId(id) {
    const data = PeopleRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return data;
  }

  async delete(id) {
    return PeopleRepository.delete(id);
  }

  async update(id, payload) {
    const data = await PeopleRepository.update(id, payload);
    return data;
  }

  async find(query) {
    const data = await PeopleRepository.find(query);
    if (data.Pessoas.length === 0) throw new NotFound(query);
    return data;
  }
}
module.exports = new PeopleService();
