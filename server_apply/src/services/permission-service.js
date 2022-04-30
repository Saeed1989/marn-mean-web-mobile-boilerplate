const models = require("../models/data-models");
const {
  PermissionViewModel,
} = require("../models/view-models/permission-view-model");
const { NotFound } = require("../utils/errors");
const Model = models.Permission;

const getAll = async () => {
  const items = await Model.find();
  let viewModels = items.map((item) => PermissionViewModel.convert(item));
  return viewModels;
};

const upsert = async (permission) => {
  const item = await Model.findOne(permission);
  if (item == null) {
    const model = await Model.createNew(permission);
    const savedItem = await model.save();
    return savedItem._id;
  }
  return "Already exists";
};

const save = async (permission) => {
  const model = await Model.createNew(permission);
  model.updatedAt = Date.now().toString();
  model.createdAt = Date.now().toString();
  const savedItem = await model.save();
  return savedItem._id;
};

const update = async (permission) => {
  const id = permission.id;
  let model = await Model.findById(id);
  if (model) {
    model.roleName = permission.roleName;
    model.resourceName = permission.resourceName;
    model.isAllowed = permission.isAllowed;
    model.isDisabled = permission.isDisabled;

    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }
  throw new NotFound("Permission not found by the id: " + id);
};

const deleteById = async (id) => {
  let model = await Model.findById(id);
  if (model) {
    let result = await Model.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound("Permission not found by the id: " + id);
};
const getById = async (id) => {
  let model = await Model.findById(id);
  let viewModel = PermissionViewModel.convert(model);
  return viewModel;
};

const search = async (searchRequest) => {
  const items = await Model.find(searchRequest);
  let viewModels = items.map((item) => PermissionViewModel.convert(item));
  return viewModels;
};

module.exports = { getAll, save, update, deleteById, getById, search, upsert };
