const db = require("mysql2");
const conn = db.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "kwn1dls2rhd!",
  database: "couple",
});

module.exports = conn;
