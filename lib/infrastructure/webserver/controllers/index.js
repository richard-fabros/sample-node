const express = require("express");
const router = express.Router();

module.exports = function (services) {
  const users = require("./users")(services);
  router
    .get("/users", users.findUsers)
    .get("/users/:id", users.getUser)
    .post("/users", users.createUser)
    .delete("/users/:id", users.deleteUser);
  return router;
};
