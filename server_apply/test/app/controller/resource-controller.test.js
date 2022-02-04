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
  const app = require("../../../src/app");

  // should create a resource and get by id successfully
  it("should create a resource and get by id successfully", async () => {
    const res = await request(app).post("/api/resources").send({
      name: "testResource1",
      type: "testType",
      createdAt: "2020-01-01",
      updatedAt: "2020-04-01",
    });
    expect(res.statusCode).toEqual(201);
    console.log(res.body);
    expect(res.body).not.toBeNull();
    const id = res.body;

    const res2 = await request(app).get("/api/resources/" + id);
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.name).toEqual("testResource1");
  });
});
