const { handleError, handleRequest, handleValidation } = require("./common");
const { logRequest } = require("./requestLogger");
const { checkAuthentication } = require("./authGuard");

module.exports = {
  handleError,
  handleRequest,
  handleValidation,
  logRequest,
  checkAuthentication,
};
