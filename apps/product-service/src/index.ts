import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "./midleware/authMiddleware";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

app.get("/test", shouldBeUser, (req, res) => {
  res.json({ message: "Product service authenticated", userId: req.userId });
});

// app.get("/test", (req, res) => {
//   res.json({ message: "Backend working" });
// });

app.listen(8000, () => {
  console.log("Product service is running on port http://localhost:8000");
});
