const logger = global.logger;

const log = (req, res, next) => {
  logger.info(`${req.method}: ${req.path}`);
  next();
};

module.exports = log;
