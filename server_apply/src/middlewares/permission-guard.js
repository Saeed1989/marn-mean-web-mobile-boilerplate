const logger = require("pino")();
const permissionSearch = require("../services/permission-service").search;
const getUserById = require("../services/user-service").getById;

const checkPermission = async (req, res, next) => {
  const userInfo = req.user;
  const resourceName = req.resourceName;
  const user = await getUserById(userInfo.id);
  if (user && user.roleName && resourceName) {
    const permission = await permissionSearch({
      roleName: user.roleName,
      resourceName: resourceName,
    });

    if (
      permission &&
      permission.length > 0 &&
      permission[0].isAllowed &&
      !permission[0].isDisabled
    ) {
      // the user has this permission
      logger.info("Has perission:", permission);
      next();
      return;
    }
  }

  // the user does not have this permission
  logger.error("Does not have permission", user);
  return res.sendStatus(403);
};

module.exports = {
  checkPermission,
};
