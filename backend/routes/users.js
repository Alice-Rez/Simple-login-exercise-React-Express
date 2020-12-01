var express = require("express");
var router = express.Router();
var mysql = require("mysql");
// const userInfo = require("../public/data/login");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Password123!",
  database: "users",
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  let loginReq = req.body;

  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(
      "select firstName, lastName from loginInfo where email=? and password=?;",
      [req.body.email, req.body.pwd],
      (err, result, fields) => {
        if (err) {
          throw err;
        }
        if (result.length) {
          res.send({
            message: "login successful",
            userData: result[0],
          });
        } else {
          res.send({ message: "Incorrect login data, try again." });
        }
      }
    );
    con.release();
  });

  // connection.connect();
  // connection.query(
  //   "select firstName, lastName from loginInfo where email=? and password=?;",
  //   [req.body.email, req.body.pwd],
  //   (err, result, fields) => {
  //     if (err) {
  //       throw err;
  //     }
  //     if (result.length) {
  //       res.send({
  //         message: "login successful",
  //         userData: result[0],
  //       });
  //     } else {
  //       res.send({ message: "Incorrect login data, try again." });
  //     }
  //   }
  // );
});

router.post("/register", (req, res, next) => {
  console.log(req.body);
  res.end();
});

module.exports = router;
