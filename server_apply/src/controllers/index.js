const appRoutes = require("./routes");
const authRoutes = require("./auth-controller");
const healthHandler = require("./health-controller");

const configure = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api", appRoutes);
  app.use("/health", healthHandler.healthHandler);
  return app;
};

module.exports = configure;
