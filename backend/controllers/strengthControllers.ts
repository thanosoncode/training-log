import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { isValidMonth, isValidYear, workoutIsValid } from "../utils/helpers";
import { Exercise } from "@prisma/client";

const getAllStrength = async (req: Request, res: Response) => {
  const { month, year } = req.query as { month: string; year: string };

  if (isValidMonth(month) && isValidYear(year)) {
    const strength = await prisma.strength.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        createdAt: {
          gte: new Date(`${year}-${month}-1`).toISOString(),
          lte: new Date(`${year}-${month}-31`).toISOString(),
        },
      },
    });
    if (!strength) {
      return res.status(400).json({ message: "No strength workouts found" });
    }
    return res.status(200).json(strength);
  }

  const strength = await prisma.strength.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!strength) {
    return res.status(400).json({ message: "no strength workouts" });
  }
  return res.status(200).json(strength);
};

const createStrength = async (req: Request, res: Response) => {
  const { label, exercises }: { label: string; exercises: Exercise[] } =
    req.body;

  if (!workoutIsValid(label, exercises)) {
    return res
      .status(400)
      .json({ message: "Label and/or exercises are not valid" });
  }

  const workout = await prisma.strength.create({
    data: {
      label,
      exercises,
    },
  });

  res.status(201).json(workout);
};

const getSingleStrength = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const workout = await prisma.strength.findFirst({
    where: {
      id,
    },
  });
  if (!workout) {
    return res.status(400).json({ message: "Cant find workout with that id" });
  }
  return res.json(workout);
};

const updateStrength = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { label, exercises }: { label: string; exercises: Exercise[] } =
    req.body;
  if (id.length !== 24) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (!workoutIsValid(label, exercises)) {
    return res
      .status(400)
      .json({ message: "Label and/or exercises are not valid" });
  }
  const workout = await prisma.strength.findFirst({
    where: {
      id,
    },
  });
  if (!workout) {
    return res
      .status(400)
      .json({ message: "Could not find workout with that id" });
  }

  const updatedWorkout = await prisma.strength.update({
    where: {
      id,
    },
    data: {
      label,
      exercises,
    },
  });
  return res.status(200).json(updatedWorkout);
};

const deleteStrength = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const workout = await prisma.strength.findFirst({
    where: {
      id,
    },
  });
  if (!workout) {
    return res
      .status(400)
      .json({ message: "Could not find workout with that id" });
  }
  await prisma.strength.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(workout);
};

export {
  getAllStrength,
  createStrength,
  getSingleStrength,
  updateStrength,
  deleteStrength,
};
