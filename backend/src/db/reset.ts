import AppDataSource from "../data-source";
import { Mishna } from "../models/Mishna";
import fs from "fs/promises"; // Use promises for better async handling
import path from "path";

const reset = async () => {
  try {
    // Initialize the data source
    const dataSource = await AppDataSource.initialize();

    const mishnaRepository = dataSource.getRepository(Mishna);

    // Clear existing data from the table
    await mishnaRepository.clear();
    console.log("All existing mishnayot removed.");

    // Read the text file
    const filePath = path.resolve(__dirname, "mishnayot.txt");
    const data = await fs.readFile(filePath, "utf8");

    // Split into lines and process each
    const itemArr: string[] = data.split("\n");

    for (const line of itemArr) {
      const [masechet, startperek] = line.split("/");

      if (!masechet || !startperek) {
        console.warn(`Skipping invalid line: ${line}`);
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
      console.log(`Saved: ${JSON.stringify(newMishna)}`);
    }

    console.log("Reset completed successfully.");
  } catch (error) {
    console.error("Error during reset:", error);
  } finally {
    // Close the connection
    await AppDataSource.destroy();
  }
};

export default reset;
