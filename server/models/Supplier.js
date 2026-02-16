import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
      note: {
      type: String,
      required: true,
    },
    employer: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
    },
    store: {
      type: String,
    },
     note: {
      type: String,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Supplier", SupplierSchema);
