const clientGuard = (req, res, next) => {
  if (req.user.role !== "client") {
    return res.status(403).send({ message: "Faqat clientlar kirishi mumkin" });
  }
  next();
};

module.exports = clientGuard;
