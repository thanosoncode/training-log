import express from "express";
import {
  getAllCardio,
  createCardio,
  getSingleCardio,
  updateCardio,
  deleteCardio,
} from "../controllers/cardioControllers";

const cardioRouter = express.Router();

cardioRouter.route("/").get(getAllCardio).post(createCardio);
cardioRouter
  .route("/:id")
  .get(getSingleCardio)
  .put(updateCardio)
  .delete(deleteCardio);

export { cardioRouter };
