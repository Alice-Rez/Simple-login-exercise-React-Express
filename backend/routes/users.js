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
  port: 3306,
  user: "root",
  password: "",
  name: "users",
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  let loginReq = req.body;
  let userId = false;
  let userInfo;

  connection.connect();
  connection.query("select * from loginInfo;", (err, result, fields) => {
    if (err) throw err;
    userInfo = result;
  });

  console.log(userInfo);

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
