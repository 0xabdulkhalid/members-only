const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const messagesRouter = require("./routes/messages");

const app = express();

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 Minute
  max: 100, // Limit each IP to 100 requests per Window
});
app.use(limiter);

const mongoDB = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      client: mongoose.connection,
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 60,
    }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      httpOnly: true, // Prevent client-side access using JavaScript
      sameSite: 'strict', // Prevent cross-site requests, Saving app from CSRF like attacks
      secure: true, // Site is served over HTTPS on Glitch's Free Tier
    },
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/messages", messagesRouter);

require("./passport-config");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
