import fs from "fs";
import client from "../config/azureClient.js";
import Document from "../models/Document.js";
import { validateFilmContract } from "../utils/validateText.js";

export const validateDocument = async (req, res) => {
  try {
    const filePath = req.file.path;

    const poller = await client.beginAnalyzeDocument(
      "prebuilt-layout",
      fs.createReadStream(filePath),
      { pages: ["1"] } // 🔥 ONLY PAGE 1
    );

    const result = await poller.pollUntilDone();
    const text = result.content || "";

    const isValid = validateFilmContract(text);

    await Document.create({
      fileName: req.file.originalname,
      isValid,
      reason: isValid ? "Film contract detected" : "Invalid document"
    });

    fs.unlinkSync(filePath);

    return res.json({
      valid: isValid,
      message: isValid
        ? "Valid film rights document"
        : "Invalid document type"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Validation failed" });
  }
};
