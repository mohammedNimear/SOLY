import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sales: {
      type: String,
    },
      total: {
      type: Number,
      default: 0,
    },
     payed: {
      type: Number,
      default: 0,
    },
      pay_time: {
      type: Date,
    },
      rest_money: {
      type: Number,
      default: 0,
    },
     note: {
      type: String,
      default: "لا يوجد مدفوعات",
      placeholder:" الاشعار و تاريخه"
    },
    payment_metod: {
      type: String,
    },
      duster: {
    type: Boolean,
    default: false,
  },

  
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
