const mongoose = require("mongoose");
const mongo = require("../../mongo");
const connectWithUserDb = mongo.connectWithUserDb;

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: String, required: false },
  updatedAt: { type: String, required: false },
});

if (process.env.NODE_ENV === "test") {
  var Resource = mongoose.model("Resource", resourceSchema);
} else {
  console.log(process.env.NODE_ENV)
  var Resource = connectWithUserDb().model("Resource", resourceSchema);
}

Resource.createNew = async (resource) => {
  resource._id = new mongoose.Types.ObjectId();
  const model = new Resource(resource);
  return model;
};

module.exports = Resource;
