import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User already exists. Login or try another email" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userCreated = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  if (userCreated && process.env.SECRET) {
    const token = jwt.sign(userCreated, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.cookie("authToken", token, {
      domain:
        process.env.NODE_ENV === "production"
          ? "https://traininglog.netlify.app"
          : undefined,
      httpOnly: false,
      path: "/",
      secure: true,
      sameSite: "none",
    });
    return res.status(201).json({
      message: "User has successfully being registered",
      email,
      token,
      id: userCreated.id,
    });
  }
  return res.status(500);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const verified = await bcrypt.compare(password, user.password);
  if (!verified) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  if (process.env.SECRET) {
    const token = jwt.sign(user, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.cookie("authToken", token, {
      domain:
        process.env.NODE_ENV === "production"
          ? "https://traininglog.netlify.app"
          : undefined,
      httpOnly: false,
      path: "/",
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      message: "You have successfully logged in",
      email,
      token,
      id: user.id,
    });
  }
  return res.status(500);
};

export const authenticateToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    const user = jwt.verify(token, process.env.SECRET ?? "");
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "User not verified" });
  }
};
