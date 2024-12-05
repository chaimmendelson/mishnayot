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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const mishnaController_1 = require("../controllers/mishnaController");
const apiRouter = express.Router();
// Route for fetching all unfinished mishnas
apiRouter.get("/", mishnaController_1.MishnaController.getUnfinishedMishnas);
// Route for resetting mishnas (insert new data)
apiRouter.get("/reset", mishnaController_1.MishnaController.resetMishnas);
// Route for fetching unfinished mishnas for a specific masechet
apiRouter.get("/:masechet", mishnaController_1.MishnaController.getUnfinishedMishnasByMasechet);
// Route for fetching all mishnas (done or not done)
apiRouter.get("/all", mishnaController_1.MishnaController.getAllMishnas);
// Route for fetching all finished mishnas
apiRouter.get("/done", mishnaController_1.MishnaController.getFinishedMishnas);
// Route for marking a mishna as done
apiRouter.post("/done", mishnaController_1.MishnaController.markMishnaAsDone);
// Route for marking a mishna as undone (go back)
apiRouter.post("/goBack", mishnaController_1.MishnaController.markMishnaAsUndone);
exports.default = apiRouter;
