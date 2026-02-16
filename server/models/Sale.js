import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    note: {
      type: String,
    },
    price: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    location: {
      type: String,
    },
    employer: {
        type: String,
    },
     customer: {
        type: String,
    },
    
    rest_money: {
        type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Sale", SaleSchema);
