import mongoose from "mongoose";

const DusterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: {
      type: [String],
    },
     money: {
      type: Number,
    },
    rest_money: {
      type: Number,
            default: 0,
    },
    date: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Duster", DusterSchema);
