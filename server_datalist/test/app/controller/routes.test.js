const dataRouter = require('../../../src/controllers/data-controller');

describe('Routes', () => {

  // data routes setup ok
  test('data routes setup ok', () => {
    const routes = dataRouter.stack
      .filter(layer => layer.route)
      .map(layer => layer.route.path);
    expect(routes.includes('/search')).toBe(true)
  })

})

