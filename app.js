// Require modules
const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require("body-parser");
const winston = require("winston");

// Configuration values
const config = require("./config.json");
const logLevel = process.env.LOG_LEVEL || config.logging.level;

// Initiate global logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: config.logging.error_output_file,
      level: "errors"
    })
  ],
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

global.logger = logger;

// Initiate global database connection
const db = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  database: config.mysql.database
});

db.connect(err => {
  if (err) {
    throw err;
  }

  logger.info("Connected to database!");
});

global.db = db;

// Initiate express app
const app = express();

// Require middleware
const logMiddleware = require('./middlewares/log.middleware');

// parse application/json
app.use(cors());
app.use(logMiddleware);
app.use(bodyParser.json());

// set app routers
const router = require("./router");
app.use("/", router);

// set app to listen
const port = 3001;
app.listen(port, () =>
  logger.info(`XR Projects API listening on port ${port}!`)
);
