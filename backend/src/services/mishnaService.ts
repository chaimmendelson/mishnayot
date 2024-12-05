import AppDataSource from "../data-source"; // DataSource configuration
import { Mishna } from "../models/Mishna"; // TypeORM entity
import reset from "../db/reset";

export class MishnaService {

  // Fetch unfinished mishnas
  static async getUnfinishedMishnas() {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    return await mishnaRepository.find({
      where: { done: false }
    });
  }

  // Reset mishnas (insert new data)
  static async resetMishnas() {
    await reset();
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
  static async markMishnaAsDone(mishnaId: number) {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    await mishnaRepository.update(
      { id: mishnaId },
      { done: true }
    );
  }

  // Mark a mishna as undone (go back)
  static async markMishnaAsUndone(mishnaId: number) {
    const mishnaRepository = AppDataSource.getRepository(Mishna);
    await mishnaRepository.update(
      { id: mishnaId },
      { done: false }
    );
  }
}
