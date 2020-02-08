const jwt = require('jsonwebtoken');
const config = require('../config.json');
const logger = global.logger;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.auth.secret, { ignoreExpiration: true});

    if (Date.now() >= decodedToken.exp * 1000) {
      logger.info("Token has expired");
      res.status(401).send();
    } else if (decodedToken.user !== "quetzalcoatl") {
      logger.info(`User is unauthorized`);
      res.status(401).send();
    } else {
      next();
    }
  } catch (err) {
    logger.info("Unable to authenticate user");
    res.status(401).send();
  }
}