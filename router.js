const express = require("express");
const router = express.Router();

// routers
const groups = require("./groups/groups.router");

// routing
router.get("/", (req, res) => res.send("Hello, World!"));
router.use("/groups", groups);

module.exports = router;
