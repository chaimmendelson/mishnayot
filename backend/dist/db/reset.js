"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../data-source"));
const Mishna_1 = require("../models/Mishna");
const promises_1 = __importDefault(require("fs/promises")); // Use promises for better async handling
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger")); // Importing the logger
const reset = async () => {
    try {
        // Ensure that the data source is initialized (only once during app startup)
        if (!data_source_1.default.isInitialized) {
            await data_source_1.default.initialize();
        }
        const mishnaRepository = data_source_1.default.getRepository(Mishna_1.Mishna);
        // Clear existing data from the table
        await mishnaRepository.clear();
        logger_1.default.info("All existing mishnayot removed.");
        // Reset the serial counter for the id column
        await data_source_1.default.query('SELECT setval(\'mishna_id_seq\', 1, false)');
        logger_1.default.info("Serial counter for 'id' has been reset.");
        // Read the text file
        const filePath = path_1.default.resolve(__dirname, "mishnayot.txt");
        const data = await promises_1.default.readFile(filePath, "utf8");
        // Split into lines and process each
        const itemArr = data.split("\n");
        for (const line of itemArr) {
            const [masechet, startperek] = line.split("/");
            if (!masechet || !startperek) {
                logger_1.default.warn(`Skipping invalid line: ${line}`);
                continue;
            }
            // Create a new Mishna instance
            const newMishna = mishnaRepository.create({
                masechet: masechet.trim(),
                startperek: startperek.trim(),
                done: false, // Boolean type
            });
            // Save the instance
            await mishnaRepository.save(newMishna);
        }
        logger_1.default.info("Reset completed successfully.");
    }
    catch (error) {
        logger_1.default.error("Error during reset:", error);
    }
};
exports.default = reset;
