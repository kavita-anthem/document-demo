import express from "express";
import multer from "multer";
import { validateDocument } from "../controllers/validateController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/validate", upload.single("file"), validateDocument);

export default router;
