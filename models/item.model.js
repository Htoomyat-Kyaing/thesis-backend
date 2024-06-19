import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    sellPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "Other",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
