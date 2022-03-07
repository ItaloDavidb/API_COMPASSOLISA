const supertest = require('supertest');
const mongoose = require('mongoose');
const App = require('../app/app');
const LocationService = require('../../src/app/service/LocationService');

const locations = {};

describe('Test Feature to People', () => {
  beforeAll(async () => {
    locations.p0 = await LocationService.create({
      nome: 'italo',
      cpf: '791.133.120-06',
      data_nascimento: '27/03/2001',
      email: 'italodavid3@hotmail.com',
      senha: '1234567',
      habilitado: 'sim'
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
  // Route to Get