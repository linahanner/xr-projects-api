var express = require("express");
var router = express.Router();

// routers
const groups = require("./groups/groups.router");

// middleware
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// routing
router.get("/", (req, res) => res.send("Hello, World!"));
router.use("/groups", groups);

module.exports = router;
