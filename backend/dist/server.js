"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mishnaRoutes_1 = __importDefault(require("./routes/mishnaRoutes")); // Import routes
const data_source_1 = __importDefault(require("./data-source")); // DataSource configuration
const logger_1 = __importDefault(require("./utils/logger")); // Importing logger
const reset_1 = __importDefault(require("./db/reset"));
// Create Express application
const app = (0, express_1.default)();
// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
// Enable CORS (if needed for cross-origin requests)
app.use((0, cors_1.default)());
// Use the routes defined in mishnaRoutes
app.use("/api/mishnas", mishnaRoutes_1.default);
// Health check route
app.get("/health", (req, res) => {
    res.status(200).send("Server is running!");
});
// Start the server after connecting to the database
const startServer = async () => {
    try {
        // Connect to the database
        await data_source_1.default.initialize();
        logger_1.default.info("Data Source has been initialized!");
        await (0, reset_1.default)();
        // Set the port for the server
        const port = process.env.PORT || 4000;
        // Start the server
        app.listen(port, () => {
            logger_1.default.info(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        logger_1.default.error("Error during Data Source initialization:", error);
    }
};
// Initialize and start the server
startServer();
