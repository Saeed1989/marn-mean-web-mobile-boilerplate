const User = require("./user");
const Role = require("./role");
const Data = require("./data");
const Catagory = require("./catagory");
const Resource = require("./resource");
const Permission = require("./permission");
const Filter = require("./filter");

const models = {
  User,
  Role,
  Data,
  Catagory,
  Resource,
  Permission,
  Filter,
};

module.exports = models;
