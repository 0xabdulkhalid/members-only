const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up");
});

router.post("/sign-up", usersController.create_user);

module.exports = router;
