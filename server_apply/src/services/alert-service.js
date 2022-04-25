const models = require("../models/data-models");
const { AlertViewModel } = require("../models/view-models/alert-view-model");
const { NotFound } = require("../utils/errors");
const Model = models.Alert;

const getAll = async () => {
  const items = await Model.find();
  let viewModels = items.map((item) => AlertViewModel.convert(item));
  return viewModels;
};

const getUserAlerts = async (userId) => {
  const payload = {
    searchUserId: userId
  }
  return search(payload);
};

const getById = async (id) => {
  let model = await Model.findById(id);
  let viewModel = AlertViewModel.convert(model);
  return viewModel;
};

const search = async (payload) => {
  let dateQuery = {};
  if (payload.fromDate && payload.toDate) {
    dateQuery = { updatedAt: { $gte: payload.fromDate, $lte: payload.toDate } };
  }

  let searchQuery = {};
  if (payload.searchUserId) {
    searchQuery = { userId: { $regex: payload.searchUserId, $options: "i" } };
  }

  let query = { $and: [dateQuery, searchQuery] };

  const items = await Model.find(query);
  let viewModels = items.map((item) => AlertViewModel.convert(item));
  return viewModels;
};

module.exports = { getAll, getById, getUserAlerts };
