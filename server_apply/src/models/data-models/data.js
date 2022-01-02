const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  catagory: { type: String, required: true },
  secondDataField: { type: String, required: true },
  thirdDataField: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

const Data = mongoose.model("Data", dataSchema);

Data.createNew = async (data) => {
  data._id = new mongoose.Types.ObjectId();
  const model = new Data(data);
  return model;
};

module.exports = Data;
