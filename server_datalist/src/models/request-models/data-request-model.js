const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  category: Joi.string().min(3).max(1000).required(),
  url: Joi.string().min(3).max(1000).optional(),
  secondDataField: Joi.string().min(3).max(30).required(),
  thirdDataField: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(30),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

const validate = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  data.updatedAt = new Date();
  result.value = data;
  return result;
};

module.exports = validate;
