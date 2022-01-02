const userValidate = require("./user-request-model");
const roleValidate = require("./role-request-model");
const permissionValidate = require("./permission-request-model");
const resourceValidate = require("./resource-request-model");
const datatValidate = require("./data-request-model");
const catagoryValidate = require("./catagory-request-model");

const validators = {
  userSchemaValidate: userValidate,
  roleSchemaValidate: roleValidate,
  permissionSchemaValidate: permissionValidate,
  resourceSchemaValidate: resourceValidate,
  dataSchemaValidate: datatValidate,
  catagorySchemaValidate: catagoryValidate,
};

module.exports = validators;
