const models = require("../models/data-models");
const { NotFound } = require("../utils/errors");
const Model = models.Category;

const save = async (category) => {
  const model = await Model.createNew(category);
  const savedItem = await model.save();
  model.updatedAt = Date.now().toString();
  model.createdAt = Date.now().toString();
  return savedItem._id;
};

const update = async (category) => {
  const id = category.id;
  let model = await Model.findById(id);
  if (model) {
    model.catName = category.catName;
    model.sku = category.sku;
    model.description = category.description;
    model.parentSku = category.parentSku;
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }
  throw new NotFound("Category not found by the id: " + id);
};

const deleteById = async (id) => {
  let model = await Model.findById(id);
  if (model) {
    let result = await Model.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound("Category not found by the id: " + id);
};

module.exports = { save, update, deleteById };
