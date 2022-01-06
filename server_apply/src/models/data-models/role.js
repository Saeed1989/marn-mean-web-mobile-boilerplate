const mongoose = require("mongoose");
const mongo = require("../../mongo");
const connectWithUserDb = mongo.connectWithUserDb;

// schema
const roleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    alias: { type: String, unique: true, required: true },
});

// reference model
const Role = connectWithUserDb().model("Role", roleSchema);

Role.createNew = async (role) => {
    role._id = new mongoose.Types.ObjectId();
    const model = new Role(role);
    return model;
};

module.exports = Role;