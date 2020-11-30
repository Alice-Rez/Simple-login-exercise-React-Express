var express = require("express");
var router = express.Router();
var mysql = require("mysql");
// const userInfo = require("../public/data/login");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "users",
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  let loginReq = req.body;
  let userId = false;

  connection.connect();
  connection.query(
    "select firstName, lastName from loginInfo where (email=? and password=?);",
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

  // userInfo.map((user) => {
  //   if (user.email === loginReq.email && user.pwd === loginReq.pwd) {
  //     userId = user.id;
  //   }
  // });

  // if (userId !== false) {
  //   res.send({ message: "login successful" });
  // } else {
  //   res.send({ message: "Incorrect login data, try again." });
  // }
});

module.exports = router;
