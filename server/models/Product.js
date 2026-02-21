import mongoose from "mongoose";
import Supplier from "./Supplier.js";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    desc: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
