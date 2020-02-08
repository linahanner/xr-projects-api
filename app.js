const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const winston = require('winston');
const logLevel = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "./logs/errors.log",
        level: 'errors'
      }),
  ],
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

global.logger = logger;

const app = express();
const port = 3001;

// create database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "xrprojectsdb"
});

// connect to database
db.connect(err => {
  if (err) {
    throw err;
  }

  logger.info("Connected to database!");
});

global.db = db;

// parse application/json
app.use(bodyParser.json());

// set app routers
const router = require("./router");
app.use("/", router);

// set app to listen
app.listen(port, () =>
  logger.info(`XR Projects API listening on port ${port}!`)
);
