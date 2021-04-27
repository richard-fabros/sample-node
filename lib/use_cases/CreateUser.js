"use strict";

const User = require("../domain/User");

module.exports = (firstName, lastName, email, { userRepository }) => {
  const user = new User(null, firstName, lastName, email);

  user.validate();
  return userRepository.persist(user);
};
