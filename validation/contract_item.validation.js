const Joi = require("joi");

exports.contractItemValidation = (body) => {
  const contract_item = Joi.object({
    contract_id: Joi.string().required(),
    product_id: Joi.string().required(),
    price_per_day: Joi.number().positive().required(),
    total_price: Joi.number().positive().required(),
  });
  return contract_item.validate(body);
};
