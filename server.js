import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import validateRoute from "./routes/validateRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * ✅ Test route (health check)
 * Open in browser: http://localhost:PORT/
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working 🚀",
  });
});

/**
 * API routes
 */
app.use("/api", validateRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
