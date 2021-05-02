"use strict";

const express = require("express");
const session = require('express-session');
const helmet = require("helmet");
const routes = require("./controllers");
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const rateLimit = require("express-rate-limit")

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
      app.use(session({  
        secret: 'mySecretCookieSalt',
        key: 'myCookieSessionId', 
        cookie: {
          httpOnly: true,
          // secure: true,
          domain: 'example.com',
          // Cookie will expire in 1 hour from when it's generated 
          expires: new Date( Date.now() + 60 * 60 * 1000 )
        },
        resave: false,
        saveUninitialized: true
      }));
      app.use("/api/", rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
      }));
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
