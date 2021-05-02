'use strict';

module.exports = class {

  constructor(id = null, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  validate() {
    if (!this.validateEmail(this.email)) {
      throw new Error("User failed email validation");
    }
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }
};