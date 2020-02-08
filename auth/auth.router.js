const express = require("express");
const config = require('../config.json');
const router = express.Router();

const jwt = require('jsonwebtoken');

// Login
router.post('/login', (req, res) => {
    res.json(jwt.sign({user: "quetzalcoatl"}, config.auth.secret, { expiresIn: 60 * 15 }));
});

module.exports = router;
