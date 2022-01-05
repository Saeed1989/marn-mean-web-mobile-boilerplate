const logger = require("pino")();

const checkAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      logger.info("Auth success:", user);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
  logger.error("Auth Fail", authHeader);
};

module.exports = {
  checkAuthentication,
};
