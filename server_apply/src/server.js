const logger = require("pino")();
const app = require("./app");

const mongo = require("./mongo");

const PORT = 5003;
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
  logger.info(`server is running on port ${PORT}`);
});
