const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');

// Login
router.post('/login', (req, res) => {
    res.json(jwt.sign({user: "quetzalcoatl"}, "hello"));
});

module.exports = router;
