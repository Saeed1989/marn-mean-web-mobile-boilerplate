const mongoose = require("mongoose");

// schema
const catagorySchema = new mongoose.Schema({
  catName: { type: String, unique: true, required: true },
  sku: { type: String, required: true },
  description: { type: String, required: true },
  parentSku: { type: String, required: false },
  createdAt: { type: String, required: false },
  updatedAt: { type: String, required: false },
});

catagorySchema.index({ catagoryName: "text" });

// reference model
const Catagory = mongoose.model("Catagory", catagorySchema);

Catagory.createNew = async (catagory) => {
  catagory._id = new mongoose.Types.ObjectId();
  const model = new Catagory(catagory);
  return model;
};

module.exports = Catagory;
