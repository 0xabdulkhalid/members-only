const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up", { title: "Sign Up" });
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
});

router.get("/join-club", (req, res, next) => {
  res.render("join-club", { title: "Join Club" });
});

router.get("/become-admin", (req, res, next) => {
  res.render("become-admin", { title: "Become Admin" });
});

router.post("/join-club", usersController.become_member);

router.post("/become-admin", usersController.become_admin);

router.post("/sign-up", usersController.create_user);

router.post("/login", usersController.login_user);

router.get("/log-out", usersController.logout_user);

module.exports = router;
