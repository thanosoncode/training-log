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

const allowedOrigins: string[] = ["https://traininglog.netlify.app"];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));

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
