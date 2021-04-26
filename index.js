"use strict";

const createApp = require("./infrastructure/webserver");
const UserRepository = require('./infrastructure/repositories/UserRepositoryInMem');

// Start the server
const start = async () => {
  try {
    const app = await createApp({
        userRepository: new UserRepository()
    });
    await app.start();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
