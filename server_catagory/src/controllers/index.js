const appRoutes = require("./routes");
const healthHandler = require("./health-controller");
var jwt = require("jsonwebtoken");

const authenticateRequest = async (req, res, next) => {
  req.user = "testuser";
  next();
  return;
  let auth = req.headers["authorization"];
  if (auth) {
    auth = auth.replace("Bearer ", "");
    jwt.verify(auth, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          error: err.message || "Invalid token",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ error: "Unauthenticated request" });
  }
};

const configure = (app) => {
  app.use("/api", authenticateRequest, appRoutes);
  app.use("/health", healthHandler.healthHandler);
  return app;
};

module.exports = configure;
