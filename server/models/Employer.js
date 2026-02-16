import mongoose from "mongoose";

const EmployerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    comircial: {
      type: Number,
    },
    personal: {
      type: Number,
    },
    job: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },

  
  },
  { timestamps: true }
);

export default mongoose.model("Employer", EmployerSchema);
