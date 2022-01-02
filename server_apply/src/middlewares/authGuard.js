const logger = require("pino")();

const checkAuthentication = async (req, res, next) => {
  // TODO: check authentication
  logger.info("Auth success:", req.originalUrl);

  return next();
};

module.exports = {
  checkAuthentication,
};
