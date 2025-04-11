const Joi = require("joi");

exports.contractStatusValidation = (body) => {
  const contract_status = Joi.object({
    name: Joi.string().required(),
  });
  return contract_status.validate(body);
};
