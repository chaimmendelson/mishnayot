import "reflect-metadata";
import { DataSource } from "typeorm";
import { Mishna } from "./models/Mishna";

const AppDataSource = new DataSource({
  type: "postgres", // Use PostgreSQL
  host: process.env.POSTGRES_HOST || "localhost", // Use the Docker service name in Docker Compose
  port: Number(process.env.POSTGRES_PORT) || 5432, // Default PostgreSQL port
  username: process.env.POSTGRES_USER || "postgres", // PostgreSQL username
  password: process.env.POSTGRES_PASSWORD || "password", // PostgreSQL password
  database: process.env.POSTGRES_DB || "mishna_db", // Database name
  entities: [Mishna],
  synchronize: true, // Auto-sync schema, avoid in production
  logging: false, // Enable for debugging if needed
});

export default AppDataSource;
