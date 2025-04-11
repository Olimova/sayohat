const Joi = require("joi");

exports.productValidation = (body) => {
  const product = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category_id: Joi.string().required(),
    price_per_day: Joi.number().required(),
    rental_status_id: Joi.string().required(),
    owner_id: Joi.string().required(),
    created_at: Joi.date().required(),
  });
  return product.validate(body);
};
