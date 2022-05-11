const logger = require('../helpers/logger');

const loggerMiddleware = (req, res, next) => {
  logger.info(`Calling ${req.method} ${req.path}`);
  next();
};

module.exports = loggerMiddleware;
