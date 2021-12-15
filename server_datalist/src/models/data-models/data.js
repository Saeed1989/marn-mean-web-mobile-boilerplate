const mongoose = require("mongoose");

// schema
const dataSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  catagory: { type: String, required: true },
  secondDataField: { type: String, required: true },
  thirdDataField: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

dataSchema.index({ dataName: "text" });

// reference model
const Data = mongoose.model("Data", dataSchema);

Data.createNew = async (data) => {
  data._id = new mongoose.Types.ObjectId();
  const model = new Data(data);
  return model;
};

module.exports = Data;
