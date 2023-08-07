import { Exercise } from "@prisma/client";

export const workoutIsValid = (label: string, exercises: Exercise[]) => {
  const exercisesAreValid =
    exercises &&
    exercises.length > 0 &&
    exercises.every(
      (exercise) =>
        exercise.name &&
        exercise.sets &&
        exercise.reps &&
        exercise.weight &&
        exercise.id
    );
  const labelIsValid = label && label.length > 0;

  return exercisesAreValid && labelIsValid;
};
