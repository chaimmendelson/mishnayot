"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MishnaController = void 0;
const mishnaService_1 = require("../services/mishnaService");
const mishnaDto_1 = require("../models/DTO/mishnaDto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../utils/logger")); // Assuming logger.ts is in utils folder
class MishnaController {
    // Fetch all unfinished mishnas
    static async getUnfinishedMishnas(req, res) {
        try {
            const mishnas = await mishnaService_1.MishnaService.getUnfinishedMishnas();
            logger_1.default.info("Fetched unfinished mishnas successfully");
            res.status(200).json({ results: mishnas });
        }
        catch (err) {
            logger_1.default.error(`Error fetching unfinished mishnas: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
    // Reset mishnas (insert new data)
    static async resetMishnas(req, res) {
        try {
            await mishnaService_1.MishnaService.resetMishnas();
            logger_1.default.info("Database reset successful");
            res.status(200).send("Database reset successful.");
        }
        catch (err) {
            logger_1.default.error(`Error during reset: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
    // Fetch unfinished mishnas for a specific masechet
    static async getUnfinishedMishnasByMasechet(req, res) {
        const { masechet } = req.params;
        try {
            const mishnas = await mishnaService_1.MishnaService.getUnfinishedMishnasByMasechet(masechet);
            logger_1.default.info(`Fetched unfinished mishnas for masechet: ${masechet}`);
            res.status(200).json({ results: mishnas });
        }
        catch (err) {
            logger_1.default.error(`Error fetching unfinished mishnas for masechet ${masechet}: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
    // Fetch all mishnas (done or not done)
    static async getAllMishnas(req, res) {
        try {
            const mishnas = await mishnaService_1.MishnaService.getAllMishnas();
            logger_1.default.info("Fetched all mishnas successfully");
            res.status(200).json({ results: mishnas });
        }
        catch (err) {
            logger_1.default.error(`Error fetching all mishnas: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
    // Fetch all finished mishnas
    static async getFinishedMishnas(req, res) {
        try {
            const mishnas = await mishnaService_1.MishnaService.getFinishedMishnas();
            logger_1.default.info("Fetched finished mishnas successfully");
            res.status(200).json({ results: mishnas });
        }
        catch (err) {
            logger_1.default.error(`Error fetching finished mishnas: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
    // Mark a mishna as done
    static async markMishnaAsDone(req, res) {
        const mishnaDto = (0, class_transformer_1.plainToInstance)(mishnaDto_1.MishnaDto, req.body); // Transform the request body into MishnaDto
        // Validate the transformed DTO
        const errors = await (0, class_validator_1.validate)(mishnaDto);
        if (errors.length > 0) {
            logger_1.default.warn(`Validation errors for marking mishna as done: ${JSON.stringify(errors)}`);
            return res.status(400).json({ errors: errors });
        }
        const { masechet, startperek } = mishnaDto;
        try {
            await mishnaService_1.MishnaService.markMishnaAsDone(masechet, startperek);
            logger_1.default.info(`Mishna marked as done: ${masechet} - ${startperek}`);
            res.status(200).send("Mishna marked as done.");
        }
        catch (err) {
            logger_1.default.error(`Error marking mishna as done: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
    // Mark a mishna as undone (go back)
    static async markMishnaAsUndone(req, res) {
        const mishnaDto = (0, class_transformer_1.plainToInstance)(mishnaDto_1.MishnaDto, req.body); // Transform the request body into MishnaDto
        // Validate the transformed DTO
        const errors = await (0, class_validator_1.validate)(mishnaDto);
        if (errors.length > 0) {
            logger_1.default.warn(`Validation errors for marking mishna as undone: ${JSON.stringify(errors)}`);
            return res.status(400).json({ errors: errors });
        }
        const { masechet, startperek } = mishnaDto;
        try {
            await mishnaService_1.MishnaService.markMishnaAsUndone(masechet, startperek);
            logger_1.default.info(`Mishna marked as undone: ${masechet} - ${startperek}`);
            res.status(200).send("Mishna marked as undone.");
        }
        catch (err) {
            logger_1.default.error(`Error marking mishna as undone: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
}
exports.MishnaController = MishnaController;
