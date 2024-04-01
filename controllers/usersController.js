const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const passport = require("passport");

exports.create_user = asyncHandler(async (req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mail: req.body.mail,
    password: req.body.password,
    isAdmin: false,
  });
  const result = await user.save();

  req.login(user, function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
});

exports.logout_user = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
