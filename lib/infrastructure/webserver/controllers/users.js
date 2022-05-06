"use strict";

const ListUsers = require("../../../use_cases/ListUsers");
const CreateUser = require("../../../use_cases/CreateUser");
const GetUser = require("../../../use_cases/GetUser");
const DeleteUser = require("../../../use_cases/DeleteUser");

module.exports = function (services) {
  return {
    async createUser(request, response) {
      // Input
      const { firstName, lastName, email, password } = request.payload;

      // Treatment
      const user = await CreateUser(
        firstName,
        lastName,
        email,
        password,
        services
      );

      // Output
      response.json(services.userSerializer.serialize(user));
    },

    async findUsers(request, response) {

      // Treatment
      const users = await ListUsers(services);

      // Output
      response.json(users)
    },

    async getUser(request, response) {

      // Input
      const userId = request.params.id;

      // Treatment
      const user = await GetUser(userId, services);

      // Output
      if (!user) {
        return response.sendStatus(404);;
      }
      response.json(services.userSerializer.serialize(user));
    },

    async deleteUser(request, response) {

      // Input
      const userId = request.params.id;

      // Treatment
      await DeleteUser(userId, services);

      // Output
      response.json(204);
    },
  };
};
