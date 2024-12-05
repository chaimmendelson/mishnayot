import winston from 'winston';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS', // Set the timestamp format with milliseconds
  }),
  winston.format.printf(({ timestamp, level, message }) => {
    // Return the log format with the timestamp before the level
    return `${timestamp} [${level}]: ${message}`;
  }),
  winston.format.colorize(), // Add colors to the log levels
);

// Create the logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: logFormat,
  transports: [
    // Log to the console
    new winston.transports.Console({
      format: logFormat
    }),
  ],
});

// Export logger
export default logger;
