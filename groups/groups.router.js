var express = require('express')
var router = express.Router()

const data = require('./groups.data');

// Get all groups
router.get('/', (req, res) => {
    data.getGroups(res);
});

// Get group by id
router.get('/:id', (req, res) => {
    data.getGroupById(req.params.id, res);
});

// Create group
router.post('/', (req, res) => {
    data.addGroup(req.body, res);
});

// Update group
router.put('/:id', (req, res) => {
    data.updateGroup(req.params.id, req.body, res);
});

// Delete group
router.delete('/:id', (req, res) => {
    data.deleteGroup(req.params.id, res);
});

module.exports = router;