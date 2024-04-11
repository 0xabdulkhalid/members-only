const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/user");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Naming mail as "username" is not appropriate, but using "passport-local" strategy forces me to do so
      const user = await User.findOne({ mail: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Mail" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
