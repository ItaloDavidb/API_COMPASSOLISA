const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PeopleRepository = require('../repository/PeopleRepository');
const Conflict = require('../../errors/Conflict');
const auth = require('../config/auth.json');
const NotFound = require('../../errors/Error/notfound');
const BadRequest = require('../../errors/Error/request');
const { isOver18, isValidCpf } = require('../helper/Validations');

class PeopleService {
  async create(payload) {
    if (isValidCpf(payload.cpf) === false) {
      throw new BadRequest('Invalid CPF');
    }
    const SliceYear = payload.data_nascimento;
    const year = SliceYear.substr(6, 4);
    if (isOver18(new Date(year)) === false) {
      throw new BadRequest('You need to be more than 18 years old');
    }
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

  async authenticate(payload) {
    const { email, senha } = payload;
    const data = await PeopleRepository.findAuth({ email });
    if (!data) throw new BadRequest('Login Failed');
    if (!(await bcrypt.compare(senha, data.senha))) throw new BadRequest('Invalid Password');
    data.senha = undefined;
    data.nome = undefined;
    data.cpf = undefined;

    const token = jwt.sign({ id: data.id }, auth.secret, {
      expiresIn: 86400
    });
    return { data, token };
  }

  async findId(id) {
    const data = PeopleRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return data;
  }

  async delete(id) {
    const data = PeopleRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return PeopleRepository.delete(id);
  }

  async update(id, payload) {
    const data = PeopleRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    if (isValidCpf(payload.cpf) === false) {
      throw new BadRequest('Invalid CPF');
    }
    const SliceYear = payload.data_nascimento;
    const year = SliceYear.substr(6, 4);
    if (isOver18(new Date(year)) === false) {
      throw new BadRequest('You need to be more than 18 years old');
    }
    return PeopleRepository.update(id, payload);
  }

  async find(query) {
    const data = await PeopleRepository.find(query);
    if (data.Pessoas.length === 0) throw new NotFound(query);
    return data;
  }
}
module.exports = new PeopleService();
