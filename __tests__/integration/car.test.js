const supertest = require('supertest');
const mongoose = require('mongoose');
const App = require('../app/app');
const CarService = require('../../src/app/service/CarService');
const car = {};

describe('Test Feature to Car', () => {
  beforeAll(async () => {
    car.p0 = await CarService.create({
      modelo: 'carro massa',
      cor: 'rosa',
      ano: '1982',
      acessorios: [
        { descricao: 'Ar-condicionado' },
        { descricao: 'Dir. Hidráulica' },
      ],
      quantidadePassageiros: 2
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Route to Get', async ()=> {
    const res = await supertest(App)
      .get('/api/v1/car');

    expect(res.statusCode).toBe(200);
  });

  it('Route to Get by ID', async ()=> {
    const res = await supertest(App)
      .get(`/api/v1/car/${car.p0._id}`);

    expect(res.statusCode).toBe(200);
  });
  

  it('Route to Post', async ()=> {
    const res = await supertest(App)
      .post('/api/v1/car')
      .send({
        modelo: 'carro bala',
        cor: 'rosa',
        ano: '1982',
        acessorios: [
          { descricao: 'Ar-condicionado' },
          { descricao: 'Dir. Hidráulica' },
        ],
        quantidadePassageiros: 2
      });

    expect(res.statusCode).toBe(201);
  });

  it('Route to Update', async ()=>{
    const res = await supertest(App)
      .put(`/api/v1/car/${car.p0._id}`)
      .send({
        modelo: 'carro bala dms',
        cor: 'preto',
        ano: '1982',
        acessorios: [
          { descricao: 'Ar-condicionado' },
          { descricao: 'Dir. Hidráulica' },
        ],
        quantidadePassageiros: 2
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.cor).toBe('preto');
  });

  it('Route to Delete', async () => {
    const res = await supertest(App)
      .delete(`/api/v1/car/${car.p0._id}`);

    expect(res.statusCode).toBe(204);
  });
  
});