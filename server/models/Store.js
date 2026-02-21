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
    products:[ {
       product: {type: mongoose.Schema.Types.ObjectId,ref:"Product", required: true},
      quantity: {type:Number, default: 0},
    }
      ]
    ,
    manager: {
         type: mongoose.Schema.Types.ObjectId,
                ref: "Employer",
                required: true,
    }
  },
  { timestamps: true }
);
export default mongoose.model("Store", StoreSchema);