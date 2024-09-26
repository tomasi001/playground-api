const colors = require("colors");

const requestLogger = (req, res, next) => {
  console.log(colors.blue(`Incoming request: ${req.method} ${req.url}`));
  next();
};

module.exports = requestLogger;
