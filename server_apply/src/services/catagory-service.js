const models = require("../models/data-models");
const { NotFound } = require("../utils/errors");
const Model = models.Catagory;

const save = async (catagory) => {
  const model = await Model.createNew(catagory);
  const savedItem = await model.save();
  return savedItem._id;
};

const update = async (catagory) => {
  const id = catagory.id;
  let model = await Model.findById(id);
  if (model) {
    model.name = catagory.name;
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }
  throw new NotFound("Catagory not found by the id: " + id);
};

const deleteById = async (id) => {
  let model = await Model.findById(id);
  if (model) {
    let result = await Model.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound("Catagory not found by the id: " + id);
};

module.exports = { save, update, deleteById };
