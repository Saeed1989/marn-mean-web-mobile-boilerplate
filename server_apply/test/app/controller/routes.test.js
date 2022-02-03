const resourceRouter = require('../../../src/controllers/resource-controller');
const roleRouter = require('../../../src/controllers/role-controller');

describe('Routes', () => {

  // resource routes setup ok
  test('resource routes setup ok', () => {
    const routes = resourceRouter.stack
      .filter(layer => layer.route)
      .map(layer => layer.route.path);
    expect(routes.includes('/:id')).toBe(true)
  })

  // role routes setup ok
  test('role routes setup ok', () => {
    const routes = roleRouter.stack
      .filter(layer => layer.route)
      .map(layer => layer.route.path);
    expect(routes.includes('/:id')).toBe(true)
  })
})

