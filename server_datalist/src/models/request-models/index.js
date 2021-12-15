const permissionValidate = require("./permission-request-model");
const dataValidate = require("./data-request-model");

const validators = {
  permissionSchemaValidate: permissionValidate,
  dataSchemaValidate: dataValidate,
};

module.exports = validators;
