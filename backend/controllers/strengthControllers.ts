import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { isValidMonth, isValidYear, workoutIsValid } from "../utils/helpers";
import { Exercise } from "@prisma/client";

const getAllStrength = async (req: Request, res: Response) => {
  const { month, year, skip, take } = req.query as {
    month: string;
    year: string;
    skip: string;
    take: string;
  };

  const { userId } = req.body as { userId: string };

  if (!userId) {
    return res.status(400).json({ message: "Missing user id" });
  }

  if (isValidMonth(month) && isValidYear(year)) {
    const strength = await prisma.strength.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId,
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

  console.log("skip", skip);
  console.log("take", take);

  if (skip && take) {
    const strength = await prisma.strength.findMany({
      skip: Number(skip),
      take: Number(take),
      orderBy: {
        createdAt: "desc",
      },
      where: { userId },
    });
    if (!strength) {
      return res.status(400).json({ message: "no strength workouts" });
    }
    return res.status(200).json(strength);
  }

  const strength = await prisma.strength.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId },
  });
  if (!strength) {
    return res.status(400).json({ message: "no strength workouts" });
  }
  return res.status(200).json(strength);
};

const createStrength = async (req: Request, res: Response) => {
  const { label, exercises }: { label: string; exercises: Exercise[] } =
    req.body;

  const { userId } = req.body as { userId: string };

  if (!userId) {
    return res.status(400).json({ message: "Missing user id" });
  }

  if (!workoutIsValid(label, exercises)) {
    return res
      .status(400)
      .json({ message: "Label and/or exercises are not valid" });
  }

  const workout = await prisma.strength.create({
    data: {
      label,
      exercises,
      userId,
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

const countAllStrength = async (req: Request, res: Response) => {
  const count = await prisma.strength.count();
  return res.status(200).json(count);
};

export {
  getAllStrength,
  createStrength,
  getSingleStrength,
  updateStrength,
  deleteStrength,
  countAllStrength,
};
