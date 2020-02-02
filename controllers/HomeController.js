const express = require("express");
const DB = require("../models/DB");

class HomeController {
  path = "/";
  router = express.Router();
  constructor() {
    this.path = "/";
    this.router = express.Router();
    this.initRoutes();
    // this.getDB();
  }

  initRoutes = () => {
    this.router.get("/", this.getHome);
  };

  // async getDB() {
  //   this.db = new DB();
  //   try {
  //     const db = await this.db.connect();
  //     const users = await db.collection("users");
  //     const searchCursor = await users.find({ username: "Test Username" });
  //     const result = await searchCursor.toArray();
  //     // console.log(result);
  //     return result;
  //   } catch (error) {
  //     return console.log(error);
  //   } finally {
  //     this.db.close();
  //   }
  // }

  getHome = (req, res) => {
    return res.render("index.ejs", {
      name: "Home"
    });
  };
}

module.exports = HomeController;
