import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import path from "path"; // Import path module
import mishnaRoutes from "./routes/mishnaRoutes"; // Import routes
import AppDataSource from "./data-source"; // DataSource configuration
import { Request, Response } from "express";
import logger from "./utils/logger"; // Importing logger
import reset from "./db/reset";

// Create Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Enable CORS (if needed for cross-origin requests)
app.use(cors());

// Serve static files (for front-end)
app.use(express.static(path.join(__dirname, "../" ,"public")));

// Use the routes defined in mishnaRoutes
app.use("/api/mishnas", mishnaRoutes);

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is running!");
});

// Root route that serves the front-end
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../", "public", "index.html")); // Ensure index.html exists in your build directory
});

// Start the server after connecting to the database
const startServer = async () => {
  try {
    // Connect to the database
    await AppDataSource.initialize();
    logger.info("Data Source has been initialized!");
    await reset();

    // Set the port for the server
    const port = process.env.PORT || 3000;

    // Start the server
    app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    logger.error("Error during Data Source initialization:", error);
  }
};

// Initialize and start the server
startServer();
