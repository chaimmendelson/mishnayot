import { Request, Response } from "express";
import { MishnaService } from "../services/mishnaService";
import { MishnaDto } from "../models/DTO/mishnaDto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export class MishnaController {

  // Fetch all unfinished mishnas
  static async getUnfinishedMishnas(req: Request, res: Response) {
    try {
      const mishnas = await MishnaService.getUnfinishedMishnas();
      res.status(200).json({ results: mishnas });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Reset mishnas (insert new data)
  static async resetMishnas(req: Request, res: Response) {
    try {
      await MishnaService.resetMishnas();
      res.status(200).send("Database reset successful.");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Fetch unfinished mishnas for a specific masechet
  static async getUnfinishedMishnasByMasechet(req: Request, res: Response) {
    const { masechet } = req.params;
    try {
      const mishnas = await MishnaService.getUnfinishedMishnasByMasechet(masechet);
      res.status(200).json({ results: mishnas });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Fetch all mishnas (done or not done)
  static async getAllMishnas(req: Request, res: Response) {
    try {
      const mishnas = await MishnaService.getAllMishnas();
      res.status(200).json({ results: mishnas });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Fetch all finished mishnas
  static async getFinishedMishnas(req: Request, res: Response) {
    try {
      const mishnas = await MishnaService.getFinishedMishnas();
      res.status(200).json({ results: mishnas });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Mark a mishna as done
  static async markMishnaAsDone(req: Request, res: Response) {
    const mishnaDto = plainToInstance(MishnaDto, req.body); // Transform the request body into MishnaDto

    // Validate the transformed DTO
    const errors = await validate(mishnaDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    const { masechet, startperek } = mishnaDto;
    try {
      await MishnaService.markMishnaAsDone(masechet, startperek);
      res.status(200).send("Mishna marked as done.");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Mark a mishna as undone (go back)
  static async markMishnaAsUndone(req: Request, res: Response) {
    const mishnaDto = plainToInstance(MishnaDto, req.body); // Transform the request body into MishnaDto

    // Validate the transformed DTO
    const errors = await validate(mishnaDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    const { masechet, startperek } = mishnaDto;
    try {
      await MishnaService.markMishnaAsUndone(masechet, startperek);
      res.status(200).send("Mishna marked as undone.");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
