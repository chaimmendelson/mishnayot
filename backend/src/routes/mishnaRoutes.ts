import * as express from "express";
import { MishnaController } from "../controllers/mishnaController";

const apiRouter = express.Router();

// Route for fetching all unfinished mishnas
apiRouter.get("/", MishnaController.getUnfinishedMishnas);

// Route for resetting mishnas (insert new data)
apiRouter.get("/reset", MishnaController.resetMishnas);

// Route for fetching all mishnas (done or not done)
apiRouter.get("/all", MishnaController.getAllMishnas);

// Route for fetching all finished mishnas
apiRouter.get("/done", MishnaController.getFinishedMishnas);

// Route for marking a mishna as done
apiRouter.patch("/done/:id", MishnaController.markMishnaAsDone);

// Route for marking a mishna as undone (go back)
apiRouter.patch("/revert/:id", MishnaController.markMishnaAsUndone);

export default apiRouter;
