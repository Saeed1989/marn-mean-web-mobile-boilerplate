const User = require("./user");
const Role = require("./role");
const Data = require("./data");
const Category = require("./category");
const Resource = require("./resource");
const Permission = require("./permission");
const Alert = require("./alert");

const models = {
  User,
  Role,
  Data,
  Category,
  Resource,
  Permission,
  Alert
};

module.exports = models;
