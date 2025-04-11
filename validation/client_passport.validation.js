const Joi = require("joi");

exports.clientPassportValidation = (body) => {
  const clientpassport = Joi.object({
    client_id: Joi.string().required(),
    passport_series: Joi.string().length(2).uppercase().required(),
    passport_number: Joi.string()
      .length(7)
      .pattern(/^[0-9]+$/)
      .required(),
    issued_date: Joi.date().required(),
    gender: Joi.string().valid("male", "female").required(),
  });
  return clientpassport.validate(body)
};
