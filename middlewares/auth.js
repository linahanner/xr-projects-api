const jwt = require('jsonwebtoken');
const logger = global.logger;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "hello");
    console.log(decodedToken);
    const user = decodedToken.user;
    if (user === "quetzalcoatl") {
      next();
    } else {
      logger.info(`User is unauthorized`);
      res.status(401).send();
    }
  } catch {
    logger.info("Unable to authenticate user");
    res.status(401).send();
  }
}