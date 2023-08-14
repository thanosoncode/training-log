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

export const isValidMonth = (month: string) =>
  month && Number(month) > 0 && Number(month) < 12;

export const isValidYear = (year: string) =>
  Number(year) > 2000 && Number(year) < 2100;
