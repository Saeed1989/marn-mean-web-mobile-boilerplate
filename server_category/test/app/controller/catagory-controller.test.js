const request = require('supertest')
const dbHandler = require('../db-handler');
beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


const payloads = require('./payloads')

describe('Check category endpoints', () => {
  const app = require('../../../src/app');

  it('should return the result', async () => {
    const res = await request(app)
      .get('/api/categories');
    expect(res.statusCode).toEqual(200)
    console.log(res.body);
    expect(res.body.data).toEqual([]);
  })

})