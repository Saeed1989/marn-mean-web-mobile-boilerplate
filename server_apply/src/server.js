const logger = require("pino")();
const app = require("./app");

const mongo = require("./mongo");
const connectWithDb = mongo.connectWithDb;

const PORT = 5003;
app.listen(PORT, () => {
  connectWithDb();
  console.log("server is running on port", PORT);
  logger.info(`server is running on port ${PORT}`);
});
