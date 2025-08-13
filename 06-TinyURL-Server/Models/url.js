import mongoose from "mongoose";

const URLSchema = mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
});

export const URLs = mongoose.model("urls", URLSchema);
