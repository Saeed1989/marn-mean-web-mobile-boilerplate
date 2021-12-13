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
  let model = await Model.findById(sku);
  let viewModel = CatagoryViewModel.convert(model);
  return viewModel;
};

const search = async (payload) => {
  let dateQuery = {};
  if (payload.fromDate && payload.toDate) {
    dateQuery = { updatedAt: { $gte: payload.fromDate, $lte: payload.toDate } };
  }

  let searchQuery = {};
  if (payload.searchText) {
    searchQuery = {
      productName: { $regex: payload.searchText, $options: "i" },
    };
  }

  let query = { $and: [dateQuery, searchQuery] };

  const items = await Model.find(query).limit(10).sort({ updatedAt: -1 });
  let viewModels = items.map((item) => CatagoryViewModel.convert(item));
  return viewModels;
};

module.exports = {
  upsert,
  getAll,
  getBySku: getBySku,
};
