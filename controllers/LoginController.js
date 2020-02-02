const express = require("express");
const DB = require("../models/DB");
const Users = require("../classes/Users");

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
    this.router.post("/submit-login", this.onLoginSubmit);
  };

  onLoginSubmit = async (req, res) => {
    const dbConn = new DB();
    try {
      const user = await this.users.getUser({
        username: req.body.username,
        password: req.body.password
      });
      if (user) {
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
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
