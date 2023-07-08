const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors, json } = format;

const requestLogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()} ${message}`;
});

const errorLogFormat = printf(({ level, message, timestamp, stack }) => {
  let logMessage = `${timestamp} ${level.toUpperCase()}\n${stack || (typeof message === 'object' ? JSON.stringify(message) : message)}`;
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
