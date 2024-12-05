import AppDataSource from "../data-source"; // DataSource configuration
import { Mishna } from "../models/Mishna"; // TypeORM entity
import reset from "../db/reset";

export class MishnaService {

  // Fetch all unfinished mishnas (max 30)
  static async getUnfinishedMishnas() {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    return await mishnaRepository.find({
      where: { done: false },
      take: 30,
    });
  }

  // Reset mishnas (insert new data)
  static async resetMishnas() {
    await reset();
  }

  // Fetch unfinished mishnas for a specific masechet
  static async getUnfinishedMishnasByMasechet(masechet: string) {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    return await mishnaRepository.find({
      where: { masechet, done: false },
    });
  }

  // Fetch all mishnas (done or not done)
  static async getAllMishnas() {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    return await mishnaRepository.find();
  }

  // Fetch all finished mishnas
  static async getFinishedMishnas() {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    return await mishnaRepository.find({
      where: { done: true },
    });
  }

  // Mark a mishna as done
  static async markMishnaAsDone(masechet: string, startperek: string) {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    await mishnaRepository.update(
      { masechet, startperek },
      { done: true }
    );
  }

  // Mark a mishna as undone (go back)
  static async markMishnaAsUndone(masechet: string, startperek: string) {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    await mishnaRepository.update(
      { masechet, startperek },
      { done: false }
    );
  }
}
