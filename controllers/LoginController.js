const express = require("express");
const DB = require("../models/DB");
const Users = require("../classes/Users");
const PassportInitializer = require("../classes/Passport");
const passport = require("passport");

class LoginController {
  path = "/login";
  router = express.Router();
  constructor() {
    this.path = "/login";
    this.router = express.Router();
    this.initRoutes();
    this.users = new Users();
  }

  initRoutes = () => {
    this.router.get("/login", this.getLoginRoute);
    this.router.post("/login", this.onLoginSubmit);
  };

  onLoginSubmit = async (req, res, next) => {
    const dbConn = new DB();
    try {
      const user = await this.users.findExistingUsername({
        username: req.body.username
      });

      const initializePassport = new PassportInitializer(
        passport,
        user,
        req.body.password
      );
      initializePassport.initialize();
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
      })(req, res, next);
    } catch (error) {
      return console.log(error);
    } finally {
      dbConn.close();
    }
  };

  getLoginRoute = (req, res) => {
    return res.render("login.ejs", {
      heading: "Login"
    });
  };
}

module.exports = LoginController;
