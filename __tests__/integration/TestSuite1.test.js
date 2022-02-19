const supertest = require('supertest');
const mongoose = require('mongoose');
const App = require('../app/app');
const CarService = require('../../src/app/service/CarService');
const PeopleService = require('../../src/app/service/PeopleService');

const car = {};
let token = '';

describe('Test Feature to Car', () => {
  beforeAll(async () => {
    car.p0 = await CarService.create({
      modelo: 'carro massa',
      cor: 'rosa',
      ano: '1982',
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
      quantidadePassageiros: 2
    });
    car.p1 = await CarService.create({
      modelo: 'carro bala',
      cor: 'verde',
      ano: '1985',
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 4
    });
    car.p2 = await CarService.create({
      modelo: 'carro bala',
      cor: 'verde',
      ano: '1985',
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 4
    });
    await PeopleService.create({
      nome: 'teste',
      cpf: '757.927.610-00',
      data_nascimento: '27/03/2001',
      email: 'teste@salve.com',
      senha: '1234567',
      habilitado: 'sim'
    });
    const TokenBearer = await PeopleService.authenticate({
      email: 'teste@salve.com',
      senha: '1234567'
    });
    token = TokenBearer.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  // Route to Patch
  it('Route to Patch 200', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car/${car.p1._id}/acessorios/${car.p1.acessorios[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ descricao: 'Ar-descondicionado' });
    expect(res.statusCode).toBe(200);
  });
  // Route to Get
  it('Route to Get 200', async () => {
    const res = await supertest(App).get('/api/v1/car').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  it('Route to Get 401', async () => {
    const res = await supertest(App).get('/api/v1/car');
    expect(res.statusCode).toBe(401);
  });

  it('Route to Get by ID 200', async () => {
    const res = await supertest(App).get(`/api/v1/car/${car.p0._id}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  it('Route to Get by ID 404', async () => {
    const res = await supertest(App)
      .get(`/api/v1/car/620d67121744950da328a60d`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  it('Route to Get by ID 400', async () => {
    const res = await supertest(App).get(`/api/v1/car/620d67121744950da328a60`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Invalid ObjectId');
  });
  // Route to Post
  it('Route to Post 201', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send({
        modelo: 'carro bala',
        cor: 'rosa',
        ano: '1982',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 2
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.modelo).toBe('carro bala');
  });
  it('Route to Post 400', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send({
        modelo: 'carro bala',
        cor: 'rosa',
        ano: '1982',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 2
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('acessorios');
  });
  // Route to Update
  it('Route to Update 200', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.p2._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        modelo: 'carro bala dms',
        cor: 'preto',
        ano: '1982',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 2
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.cor).toBe('preto');
  });
  it('Route to Update 404', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/620d67121744950da328a60d`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        modelo: 'carro bala dms',
        cor: 'preto',
        ano: '1982',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 2
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  it('Route to Update 400', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/620d67121744950da328a60`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        modelo: 5,
        cor: 'preto',
        ano: '1982',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 2
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('modelo');
  });
  // Route to Delete
  it('Route to Delete 400', async () => {
    const res = await supertest(App)
      .delete(`/api/v1/car/620d67121744950da328a60`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Invalid ObjectId');
  });
  it('Route to Delete 404', async () => {
    const res = await supertest(App)
      .delete(`/api/v1/car/620d67121744950da328a60d`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('Not Found');
  });
  it('Route to Delete 204', async () => {
    const res = await supertest(App).delete(`/api/v1/car/${car.p2._id}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});
