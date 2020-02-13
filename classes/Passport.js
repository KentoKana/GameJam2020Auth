const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

class Passport {
  constructor(passport, userObj, getPasswordInput) {
    this.passport = passport;
    this.userObj = userObj;
    this.passwordInput = getPasswordInput;
  }
  initialize = () => {
    const authenticateUser = async (user, password, done) => {
      user = this.userObj;
      if (user === null) {
        return done(null, false, {
          message: "Please enter a valid username and password."
        });
      }
      try {
        await bcrypt.compare(
          this.passwordInput,
          user.password,
          (error, result) => {
            if (result) {
              done(null, user);
            } else {
              done(error, false, {
                message: "Please enter a valid username and password."
              });
            }
          }
        );
      } catch (error) {
        return done(error);
      }
    };
    this.passport.use(
      new LocalStrategy(
        { usernameField: "username", passwordField: "password" },
        authenticateUser
      )
    );
    // this.passport.serializeUser((user, done) => {
    //   console.log(user);
    //   done(null, user._id);
    // });
    // this.passport.deserializeUser((userID, done) => {
    //   return done(null, user._id);
    // });
  };
}

module.exports = Passport;
