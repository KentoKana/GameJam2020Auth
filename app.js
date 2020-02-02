"use strict";

// ---- Import Modules ---- //
const express = require("express");

/**
 * App Initializer Class.
 *
 * @param object {
 *  @param port: int; Expects a number for the Express App to run at.
 *  @param middlewares: array; Expects an array of middlewares
 *  @param controllers: array; Expects an array of controllers
 * }
 */

class App {
  constructor({ port, middlewares, controllers, viewEngine }) {
    this.port = port;
    this.app = express();
    this.middlewares(middlewares);
    this.routes(controllers);
    this.viewEngine(viewEngine);
  }

  middlewares = middlewares => {
    middlewares.forEach(middleware => {
      this.app.use(middleware);
    });
  };

  routes = controllers => {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  };

  viewEngine = engine => {
    this.app.set("view-engine", engine);
  };

  listen = () => {
    this.app.listen(this.port || process.env.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  };
}

module.exports = App;
