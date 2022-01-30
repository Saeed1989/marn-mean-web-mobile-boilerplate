const models = require("../models/data-models");
const {
  CatagoryViewModel,
} = require("../models/view-models/catagory-view-model");
const { NotFound } = require("../utils/errors");
const Model = models.Catagory;

const upsert = async (catagory) => {
  const item = await Model.findOne(catagory);
  if (item == null) {
    const model = await Model.createNew(catagory);
    const savedItem = await model.save();
    return savedItem._id;
  }
  return "Already exists";
};

const getAll = async () => {
  const items = await Model.find();
  let viewModels = items.map((item) => CatagoryViewModel.convert(item));
  return viewModels;
};

const getBySku = async (sku) => {
  const item = await Model.findOne({sku});
  let viewModels = CatagoryViewModel.convert(item);
  return viewModels;
};

module.exports = {
  upsert,
  getAll,
  getBySku,
};
