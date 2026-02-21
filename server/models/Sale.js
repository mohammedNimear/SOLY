import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    products: [{
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },
    total: {
        type: Number,
        required: true,
    },
  }],
   
  paymentMethod: {
    type: String,
    enum: ["نقدي", "أجل", "تصريف"],
    required: true,
  },

 totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    payed:{
      type: Number,
      default: 0,
      min: 0
    },
paymentDate: {
        type: Date,
        required:  function() {
            return this.paymentMethod !== "نقدي" ;
        },

    },
    note: {
        type: String,
    },
     status: {
    type: String,
    enum: ["مكتملة", "متأخرة", "معلقة"], // القيم الصحيحة
    default: "معلقة",
  },

    rest_money: {
        type: Number,
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
        required: true,
      },
     customer: {
          type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",

    },
     store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
  },
  { timestamps: true }
);

SaleSchema.post("save", async function (doc){
  try {
    const Store = mongoose.model("Store")
    const store = await Store.findById(doc.store)
    if(!store)return

    for(const item of doc.products) {
      const productIndex = store.products.findIndex(
        p=>p.product.toString() ===item.product.toString()
      )
      if(productIndex > -1) {
        store.products[productIndex].quantity -= item.quantity
      }else {
        console.warn(`المنتج ${item.productName} غير موجود في المخزن ${store.name}`)
    }
  }
    await store.save()
    console.log(` تم تحديث المخزن ${store.name} بعد عملية البيع ${doc._id}`)
  } catch (error) {
    console.log("خطأ في تحديث المخزن", error)
  }
})


export default mongoose.model("Sale", SaleSchema);
