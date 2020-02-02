"use strict";

// -- Import Modules -- //
const EshopApp = require("./app.js");
const bodyParser = require("body-parser");
const logger = require("./middlewares/logger");
const session = require("express-session");
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
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false
    }),
    logger
  ],
  viewEngine: "ejs"
});

app.listen();
