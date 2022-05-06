const mongoose = require("mongoose");
const mongo = require("../../mongo");
const connectWithCategoryDb = mongo.connectWithCategoryDb;

// schema
const categorySchema = new mongoose.Schema({
  catName: { type: String, unique: true, required: true },
  sku: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  parentSku: { type: String },
  createdAt: { type: String, required: false},
  updatedAt: { type: String, required: false},
});

categorySchema.index({ sku: "text" });

// reference model
const Category = connectWithCategoryDb().model("Category", categorySchema);

Category.createNew = async (product) => {
  product._id = new mongoose.Types.ObjectId();
  const model = new Category(product);
  return model;
};

module.exports = Category;
