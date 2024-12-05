import { Request, Response } from "express";
import { MishnaService } from "../services/mishnaService";
import logger from "../utils/logger"; // Assuming logger.ts is in utils folder

export class MishnaController {

  // Fetch all unfinished mishnas
  static async getUnfinishedMishnas(req: Request, res: Response) {
    try {
      const mishnas = await MishnaService.getUnfinishedMishnas();
      logger.info("Fetched unfinished mishnas successfully");
      res.status(200).json({ results: mishnas });
    } catch (err: any) {
      logger.error(`Error fetching unfinished mishnas: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  }

  // Reset mishnas (insert new data)
  static async resetMishnas(req: Request, res: Response) {
    try {
      await MishnaService.resetMishnas();
      logger.info("Database reset successful");
      res.status(200).send("Database reset successful.");
    } catch (err: any) {
      logger.error(`Error during reset: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  }

  // Fetch all mishnas (done or not done)
  static async getAllMishnas(req: Request, res: Response) {
    try {
      const mishnas = await MishnaService.getAllMishnas();
      logger.info("Fetched all mishnas successfully");
      res.status(200).json({ results: mishnas });
    } catch (err: any) {
      logger.error(`Error fetching all mishnas: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  }

  // Fetch all finished mishnas
  static async getFinishedMishnas(req: Request, res: Response) {
    try {
      const mishnas = await MishnaService.getFinishedMishnas();
      logger.info("Fetched finished mishnas successfully");
      res.status(200).json({ results: mishnas });
    } catch (err: any) {
      logger.error(`Error fetching finished mishnas: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  }

  // Mark a mishna as done
  static async markMishnaAsDone(req: Request, res: Response) {
    const mishnaId = req.params.id;

    try {
      await MishnaService.markMishnaAsDone(mishnaId);
      logger.info(`Mishna marked as done: ${mishnaId}`);
      res.status(200).send("Mishna marked as done.");
    } catch (err: any) {
      logger.error(`Error marking mishna as done: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  }

  // Mark a mishna as undone (go back)
  static async markMishnaAsUndone(req: Request, res: Response) {
    const mishnaId = req.params.id;

    try {
      await MishnaService.markMishnaAsUndone(mishnaId);
      logger.info(`Mishna marked as undone: ${mishnaId}`);
      res.status(200).send("Mishna marked as undone.");
    } catch (err: any) {
      logger.error(`Error marking mishna as undone: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  }
}
