const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const db = require("./database/db_connect");
const multer = require("multer");

app.use(express.static(path.join(__dirname, "/build")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const newFileName = file.originalname;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.get("/getdata", function (req, res) {
  db.query("SELECT * FROM DATA", function (err, data) {
    if (!err) {
      res.send({ photodata: data });
    } else {
      console.log(`err:` + err);
      res.send(err);
    }
  });
});

app.post("/insert", upload.array("image"), (req, res) => {
  for (let i = 0; i < req.files.length; i++) {
    db.query(
      `INSERT INTO DATA(title,description,image,startdate,enddate) VALUES('${req.body.title}','${req.body.description}','${req.files[i].filename}','${req.body.startdate}','${req.body.enddate}')`
    );
  }

  res.send({ state: "200", message: "success" });
});

app.post("/delete", (req, res) => {
  db.query(`DELETE FROM data WHERE idx = '${req.body.idx}'`, (err, data) => {
    if (!err) res.send({ state: "200", message: "success" });
    else res.send(err);
  });
});

app.delete("/reset", (req, res) => {
  db.query(`DELETE FROM data`, (err, data) => {
    if (!err) res.send({ state: "200", message: "success" });
    else res.send(err);
  });
});

module.exports = router;

app.listen(8080, function () {
  console.log("listening on 8080");
});
