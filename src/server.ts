import 'dotenv/config'; 
import express, { Request, Response } from "express";
import userRoutes from "./routes/user.routes";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { connectDB } from "./config/database";

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express + TypeScript + pnpm!");
});

app.use("/users", userRoutes);

app.use(errorHandler);

// Connect to MongoDB before starting server
connectDB().then(() => {
  app.listen(8000, () => {
    console.log("Server running at http://localhost:8000/");
  });
});