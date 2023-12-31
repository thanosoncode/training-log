import express, { Express } from "express";
import dotenv from "dotenv";
import { strengthRouter } from "./routes/strengthRoutes";
import cors, { CorsOptions } from "cors";
import { cardioRouter } from "./routes/cardioRoutes";
import { registerUserRouter } from "./routes/registerUserRoutes";
import { loginUserRouter } from "./routes/loginUserRoutes";
import { authenticateTokenRouter } from "./routes/authenticateToken";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://traininglog.netlify.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/strength", strengthRouter);
app.use("/api/cardio", cardioRouter);
app.use("/api/user/register", registerUserRouter);
app.use("/api/user/login", loginUserRouter);
app.use("/api/user/token", authenticateTokenRouter);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

export default app;
