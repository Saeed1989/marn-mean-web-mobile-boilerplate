const logger = require("pino")();

const logRequest = async (req, res, next) => {
  logger.info("Startting request:", req.originalUrl);
  logger.info("Request Type:", req.method);

  return next();
};

module.exports = {
  logRequest,
};
