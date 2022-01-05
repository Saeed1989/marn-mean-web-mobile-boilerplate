const logger = require("pino")();

const checkPermission = (req, res, next) => {
  user = req.user;
  // TODO: check if user has permission
  logger.info("Has perission:", user);
  next();
};

module.exports = {
  checkPermission,
};
