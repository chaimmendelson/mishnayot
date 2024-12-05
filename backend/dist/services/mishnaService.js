"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MishnaService = void 0;
const data_source_1 = __importDefault(require("../data-source")); // DataSource configuration
const Mishna_1 = require("../models/Mishna"); // TypeORM entity
const reset_1 = __importDefault(require("../db/reset"));
class MishnaService {
    // Fetch all unfinished mishnas (max 30)
    static async getUnfinishedMishnas() {
        const mishnaRepository = data_source_1.default.getRepository(Mishna_1.Mishna);
        return await mishnaRepository.find({
            where: { done: false },
            take: 30,
        });
    }
    // Reset mishnas (insert new data)
    static async resetMishnas() {
        await (0, reset_1.default)();
    }
    // Fetch unfinished mishnas for a specific masechet
    static async getUnfinishedMishnasByMasechet(masechet) {
        const mishnaRepository = data_source_1.default.getRepository(Mishna_1.Mishna);
        return await mishnaRepository.find({
            where: { masechet, done: false },
        });
    }
    // Fetch all mishnas (done or not done)
    static async getAllMishnas() {
        const mishnaRepository = data_source_1.default.getRepository(Mishna_1.Mishna);
        return await mishnaRepository.find();
    }
    // Fetch all finished mishnas
    static async getFinishedMishnas() {
        const mishnaRepository = data_source_1.default.getRepository(Mishna_1.Mishna);
        return await mishnaRepository.find({
            where: { done: true },
        });
    }
    // Mark a mishna as done
    static async markMishnaAsDone(masechet, startperek) {
        const mishnaRepository = data_source_1.default.getRepository(Mishna_1.Mishna);
        await mishnaRepository.update({ masechet, startperek }, { done: true });
    }
    // Mark a mishna as undone (go back)
    static async markMishnaAsUndone(masechet, startperek) {
        const mishnaRepository = data_source_1.default.getRepository(Mishna_1.Mishna);
        await mishnaRepository.update({ masechet, startperek }, { done: false });
    }
}
exports.MishnaService = MishnaService;
