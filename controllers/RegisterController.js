const express = require("express");
const DB = require("../models/DB");
const bcrypt = require("bcrypt");
const Users = require("../classes/Users");

class RegisterController {
  path = "/register";
  router = express.Router();

  constructor() {
    this.path = "/register";
    this.router = express.Router();
    this.initRoutes();
    this.users = new Users();
  }

  initRoutes = () => {
    this.router.get("/register", this.getRegister);
    this.router.post("/submit-registration", this.onRegisterSubmit);
  };

  onRegisterSubmit = async (req, res) => {
    const dbConn = new DB();
    try {
      const username = req.body.username;
      const password = await bcrypt.hash(req.body.password, 10);
      const retrievedUsername = await this.users.findExistingUsername({
        username: username
      });

      if (req.body.form__register_submit && retrievedUsername === null) {
        await this.users.insertUser({
          username: username,
          password: password
        });

        res.redirect("/");
      }

      if (retrievedUsername !== null) {
        console.log("username is taken");
        req.session.message = "That username is taken!";
        res.redirect("/register");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    } finally {
      dbConn.close();
    }
  };

  getRegister = (req, res) => {
    return res.render("register.ejs", {
      heading: "Register"
    });
  };
}

module.exports = RegisterController;
