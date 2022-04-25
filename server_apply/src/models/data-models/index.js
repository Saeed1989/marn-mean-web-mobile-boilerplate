const User = require("./user");
const Role = require("./role");
const Data = require("./data");
const Catagory = require("./catagory");
const Resource = require("./resource");
const Permission = require("./permission");
const Alert = require("./alert");

const models = {
  User,
  Role,
  Data,
  Catagory,
  Resource,
  Permission,
  Alert
};

module.exports = models;
