const supertest = require('supertest');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const App = require('../../src/app');
const PeopleService = require('../../src/app/service/PeopleService');
const person = {};

describe('Test Feature to People', () => {
  let connection;
  let db;
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
    person.p0 = await PeopleService.create({
      nome: 'italo',
      cpf: '382.731.100-44',
      data_nascimento:'27/03/2001',
      email:'italodavid3@hotmail.com',
      senha: '1234567',
      habilitado: 'sim'
    });
  });

  afterAll(async () => {
    await connection.close();
  });
  it('Route to Auth', async ()=> {
    const res = await supertest(App)
      .post('/api/v1/people/authenticate')
      .send({		
        email:'italodavid3@hotmail.com',
        senha: '1234567',
      });
    expect(res.statusCode).toBe(200);
  });

  it('Route to Get', async ()=> {
    const res = await supertest(App)
      .get('/api/v1/people');

    expect(res.statusCode).toBe(200);
  });

  it('Route to Get by ID', async ()=> {
    const res = await supertest(App)
      .get(`/api/v1/people/${person.p0._id}`);

    expect(res.statusCode).toBe(200);
  });
  

  it('Route to Post', async ()=> {
    const res = await supertest(App)
      .post('/api/v1/people')
      .send({
        nome: 'salvesnaldo',
        cpf: '810.900.440-70',
        data_nascimento:'27/03/2001',
        email:'italodavid1@hotmail.com',
        senha: '1234567',
        habilitado: 'sim'
      });

    expect(res.statusCode).toBe(201);
  });

  it('Route to Update', async ()=>{
    const res = await supertest(App)
      .put(`/api/v1/people/${person.p0._id}`)
      .send({
        nome: 'italo',
        cpf: '382.731.100-44',
        data_nascimento:'27/03/2001',
        email:'italodavid4@hotmail.com',
        senha: '1234567',
        habilitado: 'sim'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.cpf).toBe('382.731.100-44');
  });


  it('Route to Delete', async () => {
    const res = await supertest(App)
      .delete(`/api/v1/people/${person.p0._id}`);

    expect(res.statusCode).toBe(204);
  });

  
  
});