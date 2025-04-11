const adminGuard = (req, res, next) => {
  
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Faqat adminlar kirishi mumkin" });
  }
  next();
};

module.exports=adminGuard
