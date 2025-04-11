const selfGuard = (paramName = "id") => {
  return (req, res, next) => {
    if (req.user.id !== req.params[paramName] && req.user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "Faqat o'z profilingizga kirishingiz mumkin" });
    }
    next();
  };
};

module.exports = selfGuard;
