import fs from "fs";
import client from "../config/azureClient.js";
import Document from "../models/Document.js";
import { validateFilmContract } from "../utils/validateText.js";

export const validateDocument = async (req, res) => {
  try {
    console.log("📥 Incoming validation request");

    if (!req.file) {
      console.warn("⚠️ No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📄 File received:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });

    const filePath = req.file.path;

    console.log("🚀 Sending document to Azure DI with options:", {
      model: "prebuilt-layout",
      pages: "1"
    });

    const poller = await client.beginAnalyzeDocument(
      "prebuilt-layout",
      fs.createReadStream(filePath),
      { pages: "1" } // ✅ only page 1
    );

    const result = await poller.pollUntilDone();

    console.log("📊 Azure analysis completed");
    console.log("📄 Pages analyzed by Azure:", result.pages?.length || 0);

    const text = result.content || "";

    console.log(
      "📝 Extracted text sample (first 300 chars):",
      text.slice(0, 300)
    );

    const isValid = validateFilmContract(text);

    console.log("✅ Validation result:", isValid ? "VALID" : "INVALID");

    await Document.create({
      fileName: req.file.originalname,
      isValid,
      reason: isValid ? "Film contract detected" : "Invalid document"
    });

    console.log("💾 Validation result saved to MongoDB");

    // 🧹 Cleanup temp file
    fs.unlinkSync(filePath);
    console.log("🧹 Temp file deleted");

    return res.json({
      valid: isValid,
      message: isValid
        ? "Valid film rights document"
        : "Invalid document type"
    });

  } catch (err) {
    console.error("❌ Validation error:", err);
    res.status(500).json({ error: "Validation failed" });
  }
};
