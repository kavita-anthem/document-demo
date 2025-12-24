import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

// Load env variables immediately
dotenv.config();

if (!process.env.AZURE_KEY || !process.env.AZURE_ENDPOINT) {
  throw new Error("Azure environment variables are missing! Check .env file.");
}

const client = new DocumentAnalysisClient(
  process.env.AZURE_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_KEY)
);

export default client;
