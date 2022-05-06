const dbHandler = require("../db-handler");
const dataService = require("../../../src/services/data-service");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

/**
 * Data test suite.
 */
describe("Data", () => {
  // create and search data test
  it("can be created and searched successfully", async () => {
    const dataId = await dataService.save(dataComplete);
    expect(dataId).toBeDefined();

    const datas = await dataService.search({
      searchText: "thisisloguniquecategory",
    });
    expect(datas.length).toBe(1);
    expect(datas[0].name).toBe("Thisislonguniquename");
  });

  /**
   * Complete data example.
   */
  const dataComplete = {
    name: "Thisislonguniquename",
    category: "thisisloguniquecategory",
    secondDataField: "dummy",
    thirdDataField: "dummy",
    description: "dummy"
  };
});
