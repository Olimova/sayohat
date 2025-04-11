const Joi = require("joi");

exports.contractValidation = (body) => {
  const contract = Joi.object({
    contract_date: Joi.date().iso().required(),
    document_url: Joi.string().uri().required(),
    owner_id: Joi.string().required(),
    client_id: Joi.string().required(),
    status_id: Joi.string().required(),
    created_at: Joi.date().iso().required(),
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().required(),
    condition: Joi.string().required(),
  });
  return contract.validate(body);
};
