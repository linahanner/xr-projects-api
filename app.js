const express = require('express')
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express()
const port = 3001

// create database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "xrprojectsdb"
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

// parse application/json
app.use(bodyParser.json())

// set app routers
const router = require('./router');
app.use('/', router);

// set app to listen
app.listen(port, () => console.log(`XR Projects API listening on port ${port}!`))