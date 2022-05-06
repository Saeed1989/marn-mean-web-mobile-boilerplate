const mongoose = require("mongoose");

// schema
const categorySchema = new mongoose.Schema({
  catName: { type: String, unique: true, required: true },
  sku: { type: String, required: true },
  description: { type: String, required: true },
  parentSku: { type: String, required: false },
  createdAt: { type: String, required: false },
  updatedAt: { type: String, required: false },
});

categorySchema.index({ categoryName: "text" });

// reference model
const Category = mongoose.model("Category", categorySchema);

Category.createNew = async (category) => {
  category._id = new mongoose.Types.ObjectId();
  const model = new Category(category);
  return model;
};

module.exports = Category;
