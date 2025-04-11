const Joi = require("joi");

exports.clientValidation = (body) => {
  const client = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    phone_number: Joi.string()
      .pattern(/^\+998\d{9}$/)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    refresh_token: Joi.string(),
    otp: Joi.string().length(6).pattern(/^\d+$/).optional(),
    created_at: Joi.date().optional(),
    is_active: Joi.boolean().optional(),
  });
  return client.validate(body);
};
