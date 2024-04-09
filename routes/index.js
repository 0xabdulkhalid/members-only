var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("User logged in:", req.isAuthenticated());
  res.render("index", { title: "Home" });
});

module.exports = router;
