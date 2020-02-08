const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');

// Login
router.post('/login', (req, res) => {
    res.json(jwt.sign({user: "quetzalcoatl"}, "secret", { expiresIn: 60 * 15 }));
});

module.exports = router;
