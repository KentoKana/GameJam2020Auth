"use strict";

// -- Import Modules -- //
const EshopApp = require("./app.js");
const bodyParser = require("body-parser");
const logger = require("./middlewares/logger");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const dotenv = require("dotenv");
dotenv.config();

const HomeController = require("./controllers/HomeController");
const RegisterController = require("./controllers/RegisterController");
const LoginController = require("./controllers/LoginController");
const app = new EshopApp({
  port: 9793,
  controllers: [
    new HomeController(),
    new RegisterController(),
    new LoginController()
  ],
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    flash(),
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false
    }),
    passport.initialize(),
    passport.session(),
    logger
  ],
  viewEngine: "ejs"
});

app.listen();
