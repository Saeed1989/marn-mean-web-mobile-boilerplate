const models = require("../models/data-models");
const {
  CategoryViewModel,
} = require("../models/view-models/category-view-model");
const { NotFound } = require("../utils/errors");
const Model = models.Category;

const upsert = async (category) => {
  const item = await Model.findOne(category);
  if (item == null) {
    const model = await Model.createNew(category);
    const savedItem = await model.save();
    return savedItem._id;
  }
  return "Already exists";
};

const getAll = async () => {
  const items = await Model.find();
  let viewModels = items.map((item) => CategoryViewModel.convert(item));
  return viewModels;
};

const getBySku = async (sku) => {
  const item = await Model.findOne({sku});
  let viewModels = CategoryViewModel.convert(item);
  return viewModels;
};

module.exports = {
  upsert,
  getAll,
  getBySku,
};
