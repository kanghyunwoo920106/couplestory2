const db = require("mysql2");
const conn = db.createConnection({
  host: "database-1.cg3gjoo05mcy.ap-northeast-2.rds.amazonaws.com",
  port: 3306,
  user: "root",
  password: "kwn1dls2rhd!",
  database: "couple",
});

module.exports = conn;
