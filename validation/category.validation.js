const Joi = require("joi");

exports.categoryValidation = (body) => {
  const category = Joi.object({
    name: Joi.string().required(),
  });
  return category.validate(body);
};

