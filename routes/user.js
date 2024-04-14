const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/sign-up", (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");

  res.render("sign-up", { title: "Sign Up", formData: {} });
});

router.get("/login", (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");

  res.render("login", { title: "Login" });
});

router.get("/join-club", (req, res, next) => {
  if (!req.isAuthenticated() || (req.user && req.user.isMember))
    return res.redirect("/");

  res.render("join-club", { title: "Join Club" });
});

router.get("/become-admin", (req, res, next) => {
  if (!req.isAuthenticated() || (req.user && req.user.isAdmin))
    return res.redirect("/");

  res.render("become-admin", { title: "Become Admin" });
});

router.post("/join-club", usersController.become_member);

router.post("/become-admin", usersController.become_admin);

router.post("/sign-up", usersController.create_user);

router.post("/login", usersController.login_user);

router.get("/log-out", usersController.logout_user);

module.exports = router;
