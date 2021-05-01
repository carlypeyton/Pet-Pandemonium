const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      // When a user tries to sign in this code runs
      User.findOne({
        email: email
      })
        .then(user => {
          // If there's no user with the given email
          if (!user) {
            const newUser = new User({ email, password });
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    return done(null, false, { message: err });
                  });
              });
            });
          } else {
            bcrypt.compate(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Wrong Password" });
              }
            });
          }
        })
        .catch(err => {
          return done(null, false, { message: err });
        });
    }
  )
);

module.exports = passport;
