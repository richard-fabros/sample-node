"use strict";

const express = require("express");
const routes = require("./controllers");

const createApp = async (services) => {
  const app = express();
  //app.serviceLocator = require("../../infrastructure/config/service-locator");
  return {
    start: () => {
      const port = process.env.PORT || 3000;
      const router = routes(services);
      app.use(router);
      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
      return app;
    }
  };
};

module.exports = createApp;
