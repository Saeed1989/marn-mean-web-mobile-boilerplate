const dbHandler = require("../db-handler");
const categoryService = require("../../../src/services/category-service");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

/**
 * category test suite.
 */
describe("category", () => {
  // create and search category test
  it("can be created and searched successfully", async () => {
    const categoryId = await categoryService.upsert(categoryComplete);
    expect(categoryId).toBeDefined();

    const category = await categoryService.getBySku("thisisuniquesku");
    expect(category).toBeDefined();
    expect(category.catName).toBe("Main Cat 1");
  });

  /**
   * Complete category example.
   */
  const categoryComplete = {
    catName: "Main Cat 1",
    sku: "thisisuniquesku",
    description: "A description",
    parentSku: "",
  };
});
