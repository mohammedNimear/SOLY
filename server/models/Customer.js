import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
      phone: {
      type: String,
      default: 0,
    },
     type: {
      type: String,
    },
  
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
