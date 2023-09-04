import express, { Express } from "express";
import dotenv from "dotenv";
import { strengthRouter } from "./routes/strengthRoutes";
import cors from "cors";
import { cardioRouter } from "./routes/cardioRoutes";
import { registerUserRouter } from "./routes/registerUserRoutes";
import { loginUserRouter } from "./routes/loginUserRoutes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/strength", strengthRouter);
app.use("/api/cardio", cardioRouter);
app.use("/api/user/register", registerUserRouter);
app.use("/api/user/login", loginUserRouter);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

export default app;
