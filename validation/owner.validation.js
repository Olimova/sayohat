const Joi = require("joi");
exports.ownerValidation = (body) => {
  const owner = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string()
      .pattern(/^\+998\d{9}$/)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    refresh_token: Joi.string().optional(),
    otp: Joi.string().pattern(/^\d+$/).optional(),
    created_at: Joi.date().iso().optional(),
    updated_at: Joi.date().iso().optional(),
  });
  return owner.validate(body);
};
