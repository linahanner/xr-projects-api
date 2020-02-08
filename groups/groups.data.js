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

function getGroupById(id, result) {
    db.query("SELECT * FROM groups WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result.status(500).send(err);
        } else {
            result.json(res[0]);
        }
    });  
}

function addGroup(group, result) {
    db.query("INSERT INTO groups set ?", group, function (err, res, fields) {
        if (err) {
            console.log("error: ", err);
            result.status(500).send(err);
        } else {
            result.status(201).json(res.insertId);
        }
    });
}

function updateGroup(id, group, result) {
    db.query("UPDATE groups SET ? WHERE id = ?", [group, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result.status(500).send(err);
        }
        else {   
            result.json(res.group);
        }
    }); 
}

function deleteGroup(id, result) {
    db.query("DELETE FROM groups WHERE id = ?", id, function(err, es) {
        if (err) {
            console.log("error: ", err);
            result.status(500).send(err);
        } else {
            result.json();
        }
    });
}

module.exports = {
    getGroups,
    getGroupById,
    addGroup,
    updateGroup,
    deleteGroup
}