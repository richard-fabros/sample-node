const winston = require('winston');
const { format } = require('logform');

const customLogFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: customLogFormat,
});

module.exports = logger;
