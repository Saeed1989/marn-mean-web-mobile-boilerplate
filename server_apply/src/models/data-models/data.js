const mongoose = require("mongoose");
const mongo = require("../../mongo");
const connectWithDataDb = mongo.connectWithDataDb;

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  catagory: { type: String, required: true },
  secondDataField: { type: String },
  thirdDataField: { type: String },
  description: { type: String, required: true },
  createdAt: { type: String, required: false},
  updatedAt: { type: String, required: false},
});

const Data = connectWithDataDb().model("Data", dataSchema);

Data.createNew = async (data) => {
  data._id = new mongoose.Types.ObjectId();
  const model = new Data(data);
  return model;
};

module.exports = Data;
