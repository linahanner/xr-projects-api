const express = require("express");
const router = express.Router();
const logger = global.logger;

const validate = require("../middlewares/validate");
const data = require("./groups.data");

// Get all groups
router.get("/", (req, res) => {
  data.getGroups(res);
});

// Get group by id
router.get("/:id", validate.id, (req, res) => {
  data.getGroupById(req.params.id, res);
});

// Create group
router.post("/", validate.groupBody, (req, res) => {
  data.addGroup(req.body, res);
});

// Update group
router.put("/:id", validate.id, (req, res) => {
  data.updateGroup(req.params.id, req.body, res);
});

// Delete group
router.delete("/:id", validate.id, (req, res) => {
  data.deleteGroup(req.params.id, res);
});

module.exports = router;
