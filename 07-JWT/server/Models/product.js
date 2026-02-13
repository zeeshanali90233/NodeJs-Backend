import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ownerUsername: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
