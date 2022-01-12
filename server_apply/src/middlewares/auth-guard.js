const logger = require("pino")();
const jwt = require("jsonwebtoken");

const checkAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    logger.info("token: " + token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        logger.error("Auth Fail", authHeader);
        return res.sendStatus(403);
      }

      logger.info("Auth success:", user);
      req.user = user;
      next();
    });
  } else {
    logger.error("Auth Fail - No auth header", authHeader);
    res.sendStatus(401);
  }
};

module.exports = {
  checkAuthentication,
};
