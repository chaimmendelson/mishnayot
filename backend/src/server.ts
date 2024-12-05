import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import mishnaRoutes from "./routes/mishnaRoutes"; // Import routes
import AppDataSource from "./data-source"; // DataSource configuration
import { Request, Response } from "express";

// Create Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Enable CORS (if needed for cross-origin requests)
app.use(cors());

// Use the routes defined in mishnaRoutes
app.use("/api/mishnas", mishnaRoutes);

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is running!");
});

// Start the server after connecting to the database
const startServer = async () => {
  try {
    // Connect to the database
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Set the port for the server
    const port = process.env.PORT || 3000;

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

// Initialize and start the server
startServer();