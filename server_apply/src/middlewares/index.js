const { handleError, handleRequest, handleValidation } = require("./common");
const { logRequest } = require("./requestLogger");
const { checkAuthentication } = require("./authGuard");
const {checkPermission} = require("./permissionGuard");

module.exports = {
  handleError,
  handleRequest,
  handleValidation,
  logRequest,
  checkAuthentication,
  checkPermission
};
