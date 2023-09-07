import express from "express";
import {
  getAllStrength,
  createStrength,
  getSingleStrength,
  updateStrength,
  deleteStrength,
} from "../controllers/strengthControllers";

const strengthRouter = express.Router();

strengthRouter.route("/").post(getAllStrength);
strengthRouter.route("/new").post(createStrength);
strengthRouter
  .route("/:id")
  .get(getSingleStrength)
  .put(updateStrength)
  .delete(deleteStrength);

export { strengthRouter };
