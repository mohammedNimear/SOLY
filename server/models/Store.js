import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    employers_number: {
      type: Number,
    },
    products:
      [{name:String,
        quantity: Number}]
    ,
     desc: {
      type: String,
    },
    manager: {
        type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Store", StoreSchema);