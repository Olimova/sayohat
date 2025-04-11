const Joi = require("joi");

exports.productImageValidation = (body) => {
  const product_image = Joi.object({
    product_id: Joi.string().required(),
    image_url: Joi.string().required(),
    is_main: Joi.boolean().required(),
    uploaded_at:Joi.date().required(),
  });
  return product_image.validate(body);
};
