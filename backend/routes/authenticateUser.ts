import express from "express";
import { authenticateToken } from "../controllers/userControllers";

const authenticateTokenRouter = express.Router();
authenticateTokenRouter.route("/").post(authenticateToken);

export { authenticateTokenRouter };
