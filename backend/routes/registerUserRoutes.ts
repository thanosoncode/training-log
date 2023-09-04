import express from "express";
import { registerUser } from "../controllers/userControllers";

const registerUserRouter = express.Router();
registerUserRouter.route("/").post(registerUser);

export { registerUserRouter };
