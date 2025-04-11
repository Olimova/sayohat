const creatorGuard = (req, res, next) => {
  if (!req.user.is_creator) {
    return res.status(403).send({ message: "Faqat creator kirishi mumkin" });
  }
  next();
};

module.exports = creatorGuard;
