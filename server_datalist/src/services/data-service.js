const models = require("../models/data-models");
const { DataViewModel } = require("../models/view-models/data-view-model");
const { NotFound } = require("../utils/errors");
const Model = models.Data;

const save = async (data) => {
  const model = await Model.createNew(data);
  const savedItem = await model.save();
  return savedItem._id;
};

const update = async (data) => {
  const id = data._id;
  let model = await Model.findById(id);
  if (model) {
    model.productName = data.productName;
    model.cost = data.cost;
    model.sku = data.sku;
    model.price = data.price;
    model.updatedAt = Date.now().toString();
    await model.save();
    return model._id;
  }
  throw new NotFound("Data not found by the id: " + id);
};

const getById = async (id) => {
  let model = await Model.findById(id);
  let viewModel = DataViewModel.convert(model);
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
      catagory: { $regex: payload.searchText, $options: "i" },
    };
  }

  let query = { $and: [dateQuery, searchQuery] };

  const items = await Model.find(query).limit(100).sort({ updatedAt: -1 });
  let viewModels = items.map((item) => DataViewModel.convert(item));
  return viewModels;
};

const upsert = async (data) => {
  const item = await Model.findOne(data);
  if (item == null) {
    const model = await Model.createNew(data);
    const savedItem = await model.save();
    return savedItem._id;
  }
  return "Already exists";
};

module.exports = { getById, search, upsert };
