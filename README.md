Install node:
1. Download a zip of the 64-bit Windows binary, let's use 16.9 as most of our examples are on that version:
   1) https://nodejs.org/dist/v16.9.0/node-v16.9.0-win-x64.zip
1. Create folder %USERPROFILE%\bin\nodejs, then extract the zip contents into this folder
1. Open Command Prompt and set environment variables for your account
```console
setx NODEJS_HOME "%USERPROFILE%\bin\nodejs\node-v16.9.0-win-x64"
setx PATH "%NODEJS_HOME%;%PATH%"
```
1. Restart Command Prompt
2. Confirm installation
```console
node --version
npm --version
```

How to run:
1. npm install
2. npm run start
3. check http://localhost:3000/api/users

Project details:
1. index.js is the server entry point
2. Uses express js framework to set up the REST API
3. Attempts to follow clean design principles

How to use boilerplate:
1. npm install
2. npm run boilerplate:express
3. check http://localhost:3000/health