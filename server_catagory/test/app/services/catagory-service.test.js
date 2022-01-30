const dbHandler = require("../db-handler");
const catagoryService = require("../../../src/services/catagory-service");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

/**
 * catagory test suite.
 */
describe("catagory", () => {
  // create and search catagory test
  it("can be created and searched successfully", async () => {
    const catagoryId = await catagoryService.upsert(catagoryComplete);
    expect(catagoryId).toBeDefined();

    const catagory = await catagoryService.getBySku(catagoryId);
    expect(catagory).toBeDefined();
    expect(catagory.catName).toBe("Main Cat 1");
  });

  /**
   * Complete catagory example.
   */
  const catagoryComplete = {
    catName: "Main Cat 1",
    sku: "thisisuniquesku",
    description: "A description",
    parentSku: "",
  };
});
