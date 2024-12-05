"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Mishna_1 = require("./models/Mishna");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres", // Use PostgreSQL
    host: process.env.POSTGRES_HOST || "localhost", // Use the Docker service name in Docker Compose
    port: Number(process.env.POSTGRES_PORT) || 5432, // Default PostgreSQL port
    username: process.env.POSTGRES_USER || "postgres", // PostgreSQL username
    password: process.env.POSTGRES_PASSWORD || "password", // PostgreSQL password
    database: process.env.POSTGRES_DB || "mishna_db", // Database name
    entities: [Mishna_1.Mishna],
    synchronize: true, // Auto-sync schema, avoid in production
    logging: false, // Enable for debugging if needed
});
exports.default = AppDataSource;
