const catagoryRouter = require("../../../src/controllers/catagory-controller");

describe("Routes", () => {
  // catagory routes setup ok
  test("catagory routes setup ok", () => {
    const routes = catagoryRouter.stack
      .filter((layer) => layer.route)
      .map((layer) => layer.route.path);
    expect(routes.includes("/:catSku")).toBe(true);
  });

});
