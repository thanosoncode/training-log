import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

const getAllCardio = async (req: Request, res: Response) => {
  const cardio = await prisma.cardio.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!cardio) {
    return res.status(400).json({ message: "No cardio cardio sessions found" });
  }
  return res.status(200).json(cardio);
};

const createCardio = async (req: Request, res: Response) => {
  const {
    name,
    minutes,
    distance,
  }: { name: string; minutes: string; distance: string } = req.body;

  if (!name || !minutes || !distance) {
    return res
      .status(400)
      .json({ message: "Name, minutes and distance are required" });
  }

  const cardio = await prisma.cardio.create({
    data: {
      exercise: { name, minutes, distance },
    },
  });

  res.status(201).json(cardio);
};

const getSingleCardio = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const cardio = await prisma.cardio.findFirst({
    where: {
      id,
    },
  });
  if (!cardio) {
    return res
      .status(400)
      .json({ message: "Cant find cardio session with that id" });
  }
  return res.json(cardio);
};

const updateCardio = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const {
    name,
    minutes,
    distance,
  }: { name: string; minutes: string; distance: string } = req.body;

  if (!name || !minutes || !distance) {
    return res
      .status(400)
      .json({ message: "Name, minutes and distance are required" });
  }

  const cardio = await prisma.cardio.findFirst({
    where: {
      id,
    },
  });
  if (!cardio) {
    return res
      .status(400)
      .json({ message: "Could not find cardio session with that id" });
  }

  const updatedCardio = await prisma.cardio.update({
    where: {
      id,
    },
    data: {
      exercise: {
        name,
        minutes,
        distance,
      },
    },
  });
  return res.status(200).json(updatedCardio);
};

const deleteCardio = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const cardio = await prisma.cardio.findFirst({
    where: {
      id,
    },
  });
  if (!cardio) {
    return res
      .status(400)
      .json({ message: "Could not find cardio session with that id" });
  }
  await prisma.cardio.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(cardio);
};

export {
  getAllCardio,
  createCardio,
  getSingleCardio,
  updateCardio,
  deleteCardio,
};
