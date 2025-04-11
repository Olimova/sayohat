const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .send({ message: "Sizda bu amal uchun ruxsat yo‘q" });
    }
    next();
  };
};

module.exports = roleGuard;
