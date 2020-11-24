var express = require("express");
var router = express.Router();
const userInfo = require("../public/data/login");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  let loginReq = req.body;
  let userId = false;

  userInfo.map((user) => {
    if (user.email === loginReq.email && user.pwd === loginReq.pwd) {
      userId = user.id;
    }
  });

  if (userId !== false) {
    res.send({ message: "login successful", userData: userInfo[userId - 1] });
  } else {
    res.send({ message: "Incorrect login data, try again." });
  }
});

module.exports = router;
