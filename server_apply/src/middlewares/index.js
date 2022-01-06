const { handleError, handleRequest, handleValidation } = require("./common");
const { logRequest } = require("./request-logger");
const { checkAuthentication } = require("./auth-guard");
const {checkPermission} = require("./permission-guard");

module.exports = {
  handleError,
  handleRequest,
  handleValidation,
  logRequest,
  checkAuthentication,
  checkPermission
};
