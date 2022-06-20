const logger = require("pino")();

const checkApiKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  logger.info(req.headers);
  const isValidApiKey = apiKey === process.env.API_KEY;
  
  if(isValidApiKey) {
    logger.info("Has valid api key:", apiKey);
    next();
    return;
  }

  // invalid api key
  logger.error("invalid api key", apiKey);
  return res.sendStatus(403);
};

module.exports = {
  checkApiKey,
};
