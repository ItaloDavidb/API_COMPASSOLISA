const {MongoClient} = require('mongodb');
const PeopleSchema = require('../../src/app/schema/PeopleSchema');
const app = require('../../src/app');
const request = require('supertest');
describe('Auth', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();

  });

  it('Auth a Person', async () => {
    const users = await PeopleSchema.create({
      nome:'joaozinho ciclanos',
      cpf:'067.629.990-34',
      email:'joazinho@email.com',
      senha:'123456',
      habilitado:'sim',
    });

    const response = await request(app)
      .get('/authenticate')
      .send({
        email: users.email,
        senha: users.senha
      });
    expect(response.status).toBe(200);
  });
});