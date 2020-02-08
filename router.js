const express = require("express");
const router = express.Router();

const logger = global.logger;

// routers
const groups = require("./groups/groups.router");
const auth = require('./auth/auth.router');

// middleware
const authMiddleware = require('./middlewares/auth');

router.use(function timeLog(req, res, next) {
  logger.info(`${req.method}: ${req.path}`);
  next();
});

// routing
router.get("/", (req, res) => res.send("Hello, World!"));
router.use("/groups", authMiddleware, groups);
router.use("/auth", auth);

module.exports = router;
