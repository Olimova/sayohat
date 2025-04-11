const Joi = require("joi");

exports.paymentValidation = (body) => {
  const payment = Joi.object({
    payment_date: Joi.date().required(),
    amount: Joi.number().required(),
    payment_method: Joi.string().valid("cash", "credit_card", "bank_transfer").required(),
    payment_status: Joi.string().valid("completed", "pending", "failed").required(),
    amount_paid: Joi.number().required(),
  });
};
