import AppDataSource from "../data-source";
import { Mishna } from "../models/Mishna";
import fs from "fs/promises"; // Use promises for better async handling
import path from "path";
import logger from "../utils/logger"; // Importing the logger

const reset = async () => {
  try {
    // Ensure that the data source is initialized (only once during app startup)
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const mishnaRepository = AppDataSource.getRepository(Mishna);

    // Clear existing data from the table
    await mishnaRepository.clear();
    logger.info("All existing mishnayot removed.");

    // Reset the serial counter for the id column
    await AppDataSource.query('SELECT setval(\'mishna_id_seq\', 1, false)');
    logger.info("Serial counter for 'id' has been reset.");

    // Read the text file
    const filePath = path.resolve(__dirname, "mishnayot.txt");
    const data = await fs.readFile(filePath, "utf8");

    // Split into lines and process each
    const itemArr: string[] = data.split("\n");

    for (const line of itemArr) {
      const [masechet, startperek] = line.split("/");

      if (!masechet || !startperek) {
        logger.warn(`Skipping invalid line: ${line}`);
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

    logger.info("Reset completed successfully.");
  } catch (error) {
    logger.error("Error during reset:", error);
  }
};

export default reset;
