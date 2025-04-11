const ownerGuard = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).send({ message: "Faqat ownerlar kirishi mumkin" });
  }
  next();
};

module.exports = ownerGuard;
