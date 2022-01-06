const mongoose = require("mongoose");
const mongo = require("../../mongo");
const connectWithUserDb = mongo.connectWithUserDb;

// Schema

const permissionSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  resourceName: { type: String, required: true },
  isAllowed: { type: Boolean, required: true },
  isDisabled: { type: Boolean, required: true },
});

// reference model

const Permission = connectWithUserDb().model("Permission", permissionSchema);

Permission.createNew = async (permission) => {
  permission._id = new mongoose.Types.ObjectId();
  const model = new Permission(permission);
  return model;
};

module.exports = Permission;
