"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// Define log format
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS', // Set the timestamp format with milliseconds
}), winston_1.default.format.printf(({ timestamp, level, message }) => {
    // Return the log format with the timestamp before the level
    return `${timestamp} [${level}]: ${message}`;
}), winston_1.default.format.colorize());
// Create the logger instance
const logger = winston_1.default.createLogger({
    level: 'info', // Default log level
    format: logFormat,
    transports: [
        // Log to the console
        new winston_1.default.transports.Console({
            format: logFormat
        }),
    ],
});
// Export logger
exports.default = logger;
