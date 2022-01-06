const logger = require("pino")();
const permissionSearch = require("../services/permission-service").search;

const checkPermission = async (req, res, next) => {
  const user = req.user;
  const resourceName = req.resourceName;
  if (user && user.roleName && resourceName) {
    const permission = await permissionSearch({
      roleName: user.roleName,
      resourceName: resourceName
    });

    if(permission && permission.isAllowed && !permission.isDisabled) {
      // the user has this permission
      logger.info("Has perission:", permission);
      next();
    }
  }

  // the user does not have this permission
  logger.error("Does not have permission", user);
  return res.sendStatus(403);
};

module.exports = {
  checkPermission,
};
