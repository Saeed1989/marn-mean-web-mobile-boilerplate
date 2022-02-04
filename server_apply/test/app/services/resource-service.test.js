const dbHandler = require("../db-handler");
const resourceService = require("../../../src/services/resource-service");

beforeAll(async () => {
  jest.setTimeout(90 * 1000);
  await dbHandler.connect();
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

/**
 * resource test suite.
 */
describe("Resource", () => {
  // create and get resource test
  it("can be created and searched successfully", async () => {
    const resourceId = await resourceService.save(ResourceComplete);
    expect(resourceId).toBeDefined();

    const resources = await resourceService.getAll();
    expect(resources.length).toBe(1);
    expect(resources[0].name).toBe("testResource1");
  });

  // update resource test
  it("can be updated successfully", async () => {
    const resourceId = await resourceService.save(ResourceComplete);
    expect(resourceId).toBeDefined();

    const resource = await resourceService.getById(resourceId);
    expect(resource.name).toBe("testResource1");

    await resourceService.update({...resource, name: "testResource1 Updated"});

    const updatedResource = await resourceService.getById(resourceId);
    expect(updatedResource.name).toBe("testResource1 Updated");
  });

  /**
   * Complete resource example.
   */
  const ResourceComplete = {
    name: "testResource1",
    type: "testType",
    createdAt: "2020-01-01",
    updatedAt: "2020-04-01",
  };
});
