const express = require('express');
const healthController = require('./controllers/health-check');

const logger = require('./helpers/logger');
const loggerMiddleware = require('./middlewares/logger.middleware');

const app = express();
const port = 3000;

// Define middlewares
app.use(loggerMiddleware);

// Define routes
app.use('/health', healthController);

// Execute express app
app.listen(port, () => {
  logger.info(`Sample node app is listening on port ${port}`);
});
