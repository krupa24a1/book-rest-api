const routeNotFound = (req, res, next) => {
  res.status(404).send({ message: "route not found" });
  next();
};

module.exports = { routeNotFound };
