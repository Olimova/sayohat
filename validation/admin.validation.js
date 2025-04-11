const Joi = require("joi");

exports.adminValidation = (body) => {
  const admin = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    refresh_token: Joi.string().optional(),
    is_active: Joi.boolean().optional(),
    is_creator: Joi.boolean().optional(),
    role: Joi.string().valid("admin", "superadmin").required(),
  });

  return admin.validate(body, { abortEarly: false });
};
