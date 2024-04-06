const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/join-club", (req, res, next) => {
  res.render("join-club");
});

router.get("/become-admin", (req, res, next) => {
  res.render("become-admin");
});

router.post("/join-club", usersController.become_member);

router.post("/become-admin", usersController.become_admin);

router.post("/sign-up", usersController.create_user);

router.post("/login", usersController.login_user);

router.get("/log-out", usersController.logout_user);

module.exports = router;
