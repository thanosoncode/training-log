import express from "express";
import { loginUser } from "../controllers/userControllers";

const loginUserRouter = express.Router();
loginUserRouter.route("/").post(loginUser);

export { loginUserRouter };
