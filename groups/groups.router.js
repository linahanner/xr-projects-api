var express = require('express')
var router = express.Router()

const data = require('./groups.data');

// Get groups
router.get('/', (req, res) => {
    data.getGroups(res);
});
router.post('/', (req, res) => {
    data.addGroup(req.body, res);
});

module.exports = router;