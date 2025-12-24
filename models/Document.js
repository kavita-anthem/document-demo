import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  fileName: String,
  isValid: Boolean,
  reason: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Document", documentSchema);
