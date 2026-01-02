// api/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import validateRoute from "../routes/validateRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 TEST ROUTE (add here)
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API is working on Vercel 🚀",
  });
});

// MongoDB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

app.use("/api", validateRoute);

export default app;
