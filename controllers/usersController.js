const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const passport = require("passport");
require("dotenv").config;

exports.create_user = asyncHandler(async (req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mail: req.body.mail,
    password: req.body.password,
  });
  const result = await user.save();

  req.login(user, function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
});

exports.login_user = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/user/login",
});

exports.logout_user = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.become_member = asyncHandler(async (req, res, next) => {
  if (process.env.MEMBER_KEY === req.body.passcode) {
    await User.findByIdAndUpdate(req.user._id, {
      isMember: true,
    });
    return res.redirect("/");
  }
  return res.redirect("/user/join-club");
});
