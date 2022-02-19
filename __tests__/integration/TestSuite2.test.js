const supertest = require('supertest');
const mongoose = require('mongoose');
const App = require('../app/app');
const LocService = require('../../src/app/service/LocService');

const loc = {};
describe('Test Feature to Rental', () => {
  beforeAll(async () => {
    loc.p0 = await LocService.create({
      nome: 'Localiza',
      cnpj: '72458574000119',
      atividades: 'Localiza carros',
      endereco: [
        {
          cep: '96200200',
          number: '444555',
          isFilial: true
        }
      ]
    });
    loc.p1 = await LocService.create({
      nome: 'Localiza',
      cnpj: '79282338000133',
      atividades: 'Localiza carros',
      endereco: [
        {
          cep: '96200200',
          number: '444555',
          isFilial: true
        }
      ]
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  // Route to Get
  it('Route to Get 200', async () => {
    const res = await supertest(App).get('/api/v1/rental');
    expect(res.statusCode).toBe(200);
  });
  it('Route to Get By Id 200', async () => {
    const res = await supertest(App).get(`/api/v1/rental/${loc.p1._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.Locadoras.nome).toBe('Localiza');
  });
  it('Route to Get By Id 404', async () => {
    const res = await supertest(App).get(`/api/v1/rental/620d67121744950da328a60d`);
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  it('Route to Get By Id 400', async () => {
    const res = await supertest(App).get(`/api/v1/rental/620d67121744950da328a60`);
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Invalid ObjectId');
  });
  // Route to Post
  it('Route to Post 201', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Localiza aquele-la',
        cnpj: '85144459000111',
        atividades: 'Localizar carros',
        endereco: [
          {
            cep: '23825515',
            number: '123',
            isFilial: true
          }
        ]
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe('Localiza aquele-la');
  });
  it('Route to Post 400', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 4141,
        cnpj: '04679399000130',
        atividades: 'Localizar carros',
        endereco: [
          {
            cep: '23825515',
            number: '123',
            isFilial: true
          }
        ]
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('nome');
  });
  it('Route to Post 409', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Localiza aquele-la',
        cnpj: '85144459000111',
        atividades: 'Localizar carros',
        endereco: [
          {
            cep: '23825515',
            number: '123',
            isFilial: true
          }
        ]
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.description).toBe('Conflict');
  });
  // Route to Update
  it('Route to Update 404', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/620d67121744950da328a60d`)
      .send({
        nome: 'nao quero',
        cnpj: '72458574000119',
        atividades: 'Localizar carros',
        endereco: [
          {
            cep: '23825515',
            number: '123',
            isFilial: true
          }
        ]
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  it('Route to Update 400', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/620d67121744950da328a60`)
      .send({
        nome: 'nao quero',
        cnpj: '72458574000119',
        atividades: 'Localizar carros',
        endereco: [
          {
            cep: '23825515',
            number: '123',
            isFilial: true
          }
        ]
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Invalid ObjectId');
  });
  it('Route to Update 200', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/${loc.p1._id}`)
      .send({
        nome: 'nao quero',
        cnpj: '04536433000117',
        atividades: 'Localizar carros',
        endereco: [
          {
            cep: '23825515',
            number: '123',
            isFilial: true
          }
        ]
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.cnpj).toBe('04536433000117');
  });
  // Route to Delete
  it('Route to Delete 404', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/620d67121744950da328a60d`);
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  it('Route to Delete 400', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/620d67121744950da328a60`);
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Invalid ObjectId');
  });
  it('Route to Delete 204', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/${loc.p1._id}`);
    expect(res.statusCode).toBe(204);
  });
});
