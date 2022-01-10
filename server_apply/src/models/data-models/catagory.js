const mongoose = require("mongoose");
const mongo = require("../../mongo");
const connectWithCatagoryDb = mongo.connectWithCatagoryDb;

// schema
const catagorySchema = new mongoose.Schema({
  catName: { type: String, unique: true, required: true },
  sku: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  parentSku: { type: String },
});

catagorySchema.index({ sku: "text" });

// reference model
const Catagory = connectWithCatagoryDb().model("Catagory", catagorySchema);

Catagory.createNew = async (product) => {
  product._id = new mongoose.Types.ObjectId();
  const model = new Catagory(product);
  return model;
};

module.exports = Catagory;
