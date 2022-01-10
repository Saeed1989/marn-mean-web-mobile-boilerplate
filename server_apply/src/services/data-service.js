const models = require("../models/data-models");
const { NotFound } = require("../utils/errors");
const Model = models.Data;

const save = async (catagory) => {
  const model = await Model.createNew(catagory);
  model.updatedAt = Date.now().toString();
  model.createdAt = Date.now().toString();
  const savedItem = await model.save();
  return savedItem._id;
};

const update = async (data) => {
  const id = data.id;
  let model = await Model.findById(id);
  if (model) {
    model.name = data.name;
    model.description = data.description;
    model.catagory = data.catagory;
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }
  throw new NotFound("Data not found by the id: " + id);
};

const deleteById = async (id) => {
  let model = await Model.findById(id);
  if (model) {
    let result = await Model.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound("Data not found by the id: " + id);
};

module.exports = { save, update, deleteById };
