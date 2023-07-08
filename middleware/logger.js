const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors, json } = format;
const { v4: uuidv4 } = require('uuid');


const requestLogFormat = printf(({ level, message, timestamp }) => {
  const requestId = uuidv4();
  return `${timestamp} ${requestId} ${level.toUpperCase()} ${message}`;
});

const errorLogFormat = printf(({ level, message, timestamp, stack }) => {
  const requestId = uuidv4();
  let logMessage = `${timestamp} ${requestId} ${level.toUpperCase()}\n${stack || (typeof message === 'object' ? JSON.stringify(message) : message)}`;
  return logMessage;
});

const getLogger = (fileName) => {
  const logger = createLogger({
    format: combine(
      timestamp({ format: 'YYYYMMDD HH:mm:ss' }),
      errors({ stack: true }),
      json()
    ),
    transports: [
      new transports.File({
        filename: `./logs/${fileName}-request.log`,
        format: requestLogFormat,
        level: 'info'
       }),
      new transports.File({
        filename: `./logs/${fileName}-error.log`,
        format: errorLogFormat,
        level: 'error' // Set the level to 'error' to log only error messages
      }),
      new transports.Console()
    ]
  });

  return logger;
};

module.exports = getLogger;
