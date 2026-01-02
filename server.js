import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import validateRoute from "./routes/validateRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/** Health check */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working 🚀",
  });
});

/** API routes */
app.use("/api", validateRoute);

/** Connect DB (safe for serverless) */
connectDB();

/**
 * ❌ REMOVE app.listen()
 * ✅ EXPORT app
 */
export default app;
