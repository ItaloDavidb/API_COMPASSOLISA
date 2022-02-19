const supertest = require('supertest');
const mongoose = require('mongoose');
const App = require('../app/app');
const PeopleService = require('../../src/app/service/PeopleService');

const person = {};

describe('Test Feature to People', () => {
  beforeAll(async () => {
    person.p0 = await PeopleService.create({
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
  it('Route to Get 200', async () => {
    const res = await supertest(App).get('/api/v1/people');
    expect(res.statusCode).toBe(200);
  });

  it('Route to Get by ID 200', async () => {
    const res = await supertest(App).get(`/api/v1/people/${person.p0._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.Pessoas.nome).toBe('italo');
  });
  it('Route to Get by ID 404', async () => {
    const res = await supertest(App).get(`/api/v1/people/620d67121744950da328a60d`);
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  it('Route to Get by ID 400', async () => {
    const res = await supertest(App).get(`/api/v1/people/620d67121744950da328a60`);
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Invalid ObjectId');
  });
  // Route to Post
  it('Route to Post 201', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'Bilbo',
      cpf: '137.493.750-97',
      data_nascimento: '27/03/2001',
      email: 'bilbo@condado.com',
      senha: '1234567',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe('Bilbo');
  });
  it('Route to Post 409', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'Bilbo',
      cpf: '137.493.750-97',
      data_nascimento: '27/03/2001',
      email: 'bilbo@condado.com',
      senha: '1234567',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(409);
    expect(res.body.description).toBe('Conflict');
    expect(res.body.name).toBe('137.493.750-97 already in use');
  });
  it('Route to Post 409', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'Bilbo',
      cpf: '497.721.010-76',
      data_nascimento: '27/03/2001',
      email: 'bilbo@condado.com',
      senha: '1234567',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(409);
    expect(res.body.description).toBe('Conflict');
    expect(res.body.name).toBe('bilbo@condado.com already in use');
  });
  it('Route to Post 400', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 5,
      cpf: '137.493.750-97',
      data_nascimento: '27/03/2001',
      email: 'bilbo@condado.com',
      senha: '1234567',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('nome');
  });
  // Route to Auth
  it('Route to Auth 200', async () => {
    const res = await supertest(App).post('/api/v1/people/authenticate').send({
      email: 'italodavid3@hotmail.com',
      senha: '1234567'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.habilitado).toBe('sim');
  });
  it('Route to Auth 400', async () => {
    const res = await supertest(App).post('/api/v1/people/authenticate').send({
      email: 'dadadada@salve.com',
      senha: '1234567'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Bad Request');
  });
  it('Route to Auth 400', async () => {
    const res = await supertest(App).post('/api/v1/people/authenticate').send({
      email: 'italodavid3@hotmail.com',
      senha: '12345367'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.name).toBe('Invalid Password');
  });
  // Route to Update
  it('Route to Update 200', async () => {
    const res = await supertest(App).put(`/api/v1/people/${person.p0._id}`).send({
      nome: 'italo',
      cpf: '791.133.120-06',
      data_nascimento: '27/03/2001',
      email: 'italodavid4@hotmail.com',
      senha: '1234567',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.cpf).toBe('791.133.120-06');
  });
  it('Route to Update 400', async () => {
    const res = await supertest(App).put(`/api/v1/people/${person.p0._id}`).send({
      nome: 5,
      cpf: '791.133.120-06',
      data_nascimento: '27/03/2001',
      email: 'italodavid4@hotmail.com',
      senha: '1234567',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('nome');
  });
  it('Route to Update 404', async () => {
    const res = await supertest(App).put(`/api/v1/people/620d67121744950da328a604`).send({
      nome: 'Bilbo',
      cpf: '791.133.120-06',
      data_nascimento: '27/03/2001',
      email: 'italodavid4@hotmail.com',
      senha: '1234567',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  // Route to Delete
  it('Route to Delete 404', async () => {
    const res = await supertest(App).delete(`/api/v1/people/620d67121744950da328a60d`);
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  it('Route to Delete 400', async () => {
    const res = await supertest(App).delete(`/api/v1/people/620d67121744950da328a60`);
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Invalid ObjectId');
  });
  it('Route to Delete 204', async () => {
    const res = await supertest(App).delete(`/api/v1/people/${person.p0._id}`);
    expect(res.statusCode).toBe(204);
  });
});
