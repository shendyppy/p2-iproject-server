const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      const errorValidations = err.errors.map((err) => err.message);
      res.status(400).json({ message: errorValidations });
      break;
    case "SequelizeUniqueConstraintError":
      const errorUniqueValidations = err.errors.map((err) => err.message);
      res.status(400).json({ message: errorUniqueValidations });
      break;
    case "CustomError":
      res.status(err.status).json({ message: err.message });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
