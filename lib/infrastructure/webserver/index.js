"use strict";

const express = require("express");
const helmet = require("helmet");
const routes = require("./controllers");
const cookieParser = require('cookie-parser')
var csrf = require('csurf')

const createApp = async (services) => {
  const app = express();
  //app.serviceLocator = require("../../infrastructure/config/service-locator");
  return {
    start: () => {
      const port = process.env.PORT || 3000;
      const router = routes(services);
      app.set('port', port);
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cookieParser())
      app.use(csrf({ cookie: true }))
      app.use(helmet.contentSecurityPolicy());
      app.use(helmet.dnsPrefetchControl());
      app.use(helmet.expectCt());
      app.use(helmet.frameguard());
      app.use(helmet.hidePoweredBy());
      app.use(helmet.hsts());
      app.use(helmet.ieNoOpen());
      app.use(helmet.noSniff());
      app.use(helmet.permittedCrossDomainPolicies());
      app.use(helmet.referrerPolicy());
      app.use(helmet.xssFilter());
      app.use(router);
      app.all('*', function (req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
      })
      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
      return app;
    }
  };
};

module.exports = createApp;
