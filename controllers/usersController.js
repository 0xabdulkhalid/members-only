const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
require("dotenv").config;

exports.create_user = [
  body("firstName", "First Name is required.").trim().isLength({ min: 1 }),
  body("lastName", "Last Name is required.").trim().isLength({ min: 1 }),
  body("mail", "Not a valid E-mail address.")
    .isEmail()
    .custom(async (value) => {
      const existingUser = await User.findOne({ mail: value });
      if (existingUser) {
        throw new Error("E-mail address already in use.");
      }
    }),
  body("password", "Password should be at least 8 characters.")
    .trim()
    .isLength({ min: 8 }),
  body("confirm", "Passwords does not match.")
    .trim()
    .custom((value, { req }) => value !== req.body.password),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mail: req.body.mail,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        user.password = req.body.password;
        res.render("sign-up", {
          title: "Sign Up",
          formData: user,
          errors: errors.mapped(),
        });
      } else {
        const result = await user.save();

        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect("/");
        });
      }
    });
  }),
];

exports.login_user = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      console.log(req);
      return res.render("login", {
        title: "Login",
        errors: info.message,
        mail: req.body.username,
        password: req.body.password,
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/");
    });
  })(req, res, next);
};
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

exports.become_admin = asyncHandler(async (req, res, next) => {
  if (process.env.ADMIN_KEY === req.body.passcode) {
    await User.findByIdAndUpdate(req.user._id, {
      isAdmin: true,
    });
    return res.redirect("/");
  }
  return res.redirect("/user/become-admin");
});
