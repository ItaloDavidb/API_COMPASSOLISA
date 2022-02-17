/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
const LocRepository = require('../repository/LocRepository');
const CepFinder = require('../helper/cepFinder');
const NotFound = require('../../errors/Error/notfound');
const Conflict = require('../../errors/Conflict');
const BadRequest = require('../../errors/Error/request');
const { isValidCNPJ } = require('../helper/Validations');

class LocService {
  async create(payload, data) {
    if (isValidCNPJ(payload.cnpj) === false) {
      throw new BadRequest('Invalid CNPJ');
    }
    const CNPJValidate = await LocRepository.find({ cnpj: payload.cnpj });
    if (CNPJValidate.Locadoras.length > 0) {
      throw new Conflict(payload.cnpj);
    }
    let j = 0;
    while (j < payload.endereco.length) {
      const NCep = payload.endereco;
      const newAdress = NCep[j];
      const data = await CepFinder.finder(newAdress.cep);
      const { cep, logradouro, complemento, bairro, localidade, uf } = data;
      newAdress.cep = cep;
      newAdress.logradouro = logradouro;
      newAdress.complemento = complemento;
      newAdress.bairro = bairro;
      newAdress.localidade = localidade;
      newAdress.uf = uf;
      j++;
    }
    const result = await LocRepository.create(payload, data);
    return result;
  }

  async find(query) {
    const data = await LocRepository.find(query);
    if (data.Locadoras.length === 0) throw new NotFound(query);
    return data;
  }

  async findId(id) {
    const data = LocRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return data;
  }

  async delete(id) {
    const data = LocRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    return LocRepository.delete(id);
  }

  async update(id, payload) {
    const data = LocRepository.findId(id);
    if ((await data) === null) throw new NotFound(id._id);
    if (isValidCNPJ(payload.cnpj) === false) {
      throw new BadRequest('Invalid CNPJ');
    }
    let j = 0;
    while (j < payload.endereco.length) {
      const NCep = payload.endereco;
      const newAdress = NCep[j];
      const data = await CepFinder.finder(newAdress.cep);
      const { cep, logradouro, complemento, bairro, localidade, uf } = data;
      newAdress.cep = cep;
      newAdress.logradouro = logradouro;
      newAdress.complemento = complemento;
      newAdress.bairro = bairro;
      newAdress.localidade = localidade;
      newAdress.uf = uf;
      j++;
    }
    return LocRepository.update(id, payload);
  }
}
module.exports = new LocService();
