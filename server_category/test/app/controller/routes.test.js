const categoryRouter = require("../../../src/controllers/category-controller");

describe("Routes", () => {
  // category routes setup ok
  test("category routes setup ok", () => {
    const routes = categoryRouter.stack
      .filter((layer) => layer.route)
      .map((layer) => layer.route.path);
    expect(routes.includes("/:catSku")).toBe(true);
  });

});
