const mongoose = require("mongoose");
const mongo = require("../../mongo");
const connectWithUserDb = mongo.connectWithUserDb;

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const Resource = connectWithUserDb().model("Resource", resourceSchema);

Resource.createNew = async (resource) => {
  resource._id = new mongoose.Types.ObjectId();
  const model = new Resource(resource);
  return model;
};

module.exports = Resource;
