const db = global.db;

function getGroups(result) {
    db.query("SELECT * FROM groups", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result.status(500).send(err);
        } else {
            result.json(res);
        }
    });
}

function addGroup(group, result) {
    db.query("INSERT INTO groups set ?", group, function (err, res, fields) {
        if (err) {
            console.log("error: ", err);
            result.status(500).send(err);
        } else {
            result.json(res.insertId);
        }
    });
}

module.exports = {
    getGroups,
    addGroup
}