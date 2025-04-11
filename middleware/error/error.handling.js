const logger = require("../logger/logger");
const ApiError = require("../../helpers/api.error");

module.exports = function (err, req, res, next) {
  logger.error(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.toJSON());
  }

  if (err instanceof SyntaxError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.log(err)
  return res.status(500).json(ApiError.internal("Kutilmagan xatolik"));
  // next()
};
