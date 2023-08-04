import express from "express";
import {
  getWorkouts,
  createWorkout,
  getSingleWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutControllers";

const router = express.Router();

router.route("/").get(getWorkouts).post(createWorkout);
router
  .route("/:id")
  .get(getSingleWorkout)
  .put(updateWorkout)
  .delete(deleteWorkout);

export { router };
