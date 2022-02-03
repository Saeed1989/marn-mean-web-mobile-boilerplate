const dbHandler = require('../db-handler');
const resourceService = require('../../../src/services/resource-service');


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

/**
 * Resource test suite.
 */
describe('Resource', () => {

  // create and get Resource test
  it('can be created and searched successfully', async () => {
    const resourceId = await resourceService.save(ResourceComplete);
    expect(resourceId).toBeDefined();

    const resources = await resourceService.getAll();
    expect(resources.length).toBe(1);
    expect(resources[0].name).toBe('testResource1');
  });

  // update Resource test
  it('can be updated successfully', async () => {
    const resourceId = await resourceService.save(ResourceComplete);
    expect(resourceId).toBeDefined();

    const Resource = await resourceService.getById(resourceId);
    expect(Resource.name).toBe('testResource1');

    Resource.name = 'testResource1 Updated';
    await resourceService.update(Resource);

    const updatedResource = await resourceService.getById(resourceId);
    expect(updatedResource.name).toBe('testResource1 Updated');
  });

  /**
   * Complete Resource example.
   */
  const ResourceComplete = {
    name: "testResource1",
    type: "testType",
    createdAt: "2020-01-01",
    updatedAt: "2020-04-01"
  };
});