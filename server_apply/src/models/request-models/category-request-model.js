const Joi = require("joi");

const schema = Joi.object().keys({
  catName: Joi.string().required(),
  sku: Joi.string().required(),
  description: Joi.string().required(),
  parentSku: Joi.string().required().allow(null, ''),
});

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

module.exports = validate;
