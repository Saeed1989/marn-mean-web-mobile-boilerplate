const request = require("supertest");
const dbHandler = require("../db-handler");

beforeAll(async () => {
  jest.setTimeout(90 * 1000);
  await dbHandler.connect();
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const payloads = require("./payloads");

describe("Check resource endpoints", () => {
  // should create a resource and get by id successfully
  it("should create a resource and get by id successfully", async () => {
    const app = require("../../../src/app");

    const res = await request(app).get("/api/resources");
    expect(res.statusCode).toEqual(200);
    console.log(res.body);
    expect(res.body).toEqual([]);
  });
});
