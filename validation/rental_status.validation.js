const Joi = require("joi");

exports.rentalStatusValidation = (body) => {
  const rental_status = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return rental_status.validate(body);
};
