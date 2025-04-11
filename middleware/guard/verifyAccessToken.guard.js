const jwt = require("jsonwebtoken");
const config = require("config");

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: "Token topilmadi" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.get("access_key"));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send({ message: "Token noto'g'ri yoki eskirgan" });
  }
};

module.exports = verifyAccessToken;
