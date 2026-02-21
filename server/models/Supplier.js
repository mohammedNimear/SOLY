
// models/Supplier.js
import mongoose from "mongoose";
import Product from "./Product.js"; // استيراد موديل المنتج

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  product_name: { type: String, required: true }, // اسم المنتج (نص)
  employer: { type: String, required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  note: { type: String },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
}, { timestamps: true });

// Middleware بعد حفظ التوريد
supplierSchema.post('save', async function(doc) {
  try {
    console.log('🔄 تحديث المخزن بعد التوريد');
    
    // 1. ابحث عن المنتج في موديل Product باستخدام الاسم
    const product = await Product.findOne({ name: doc.product_name });
    
    if (!product) {
      console.log('❌ المنتج غير موجود في قاعدة البيانات:', doc.product_name);
      console.log('📝 يرجى إضافة المنتج أولاً من صفحة المنتجات');
      return;
    }
    
    console.log('✅ المنتج موجود:', product.name, 'بـ ID:', product._id);
    
    // 2. ابحث عن المخزن
    const Store = mongoose.model('Store');
    const store = await Store.findById(doc.store);
    
    if (!store) {
      console.log('❌ المخزن غير موجود');
      return;
    }
    
    console.log('✅ المخزن موجود:', store.name);
    
    // 3. ابحث عن المنتج في المخزن باستخدام product ObjectId
    const productIndex = store.products.findIndex(
      p => p.product && p.product.toString() === product._id.toString()
    );
    
    if (productIndex > -1) {
      // المنتج موجود - زد الكمية
      store.products[productIndex].quantity += doc.quantity;
      console.log(`📦 تم تحديث الكمية: ${store.products[productIndex].quantity}`);
    } else {
      // المنتج غير موجود - أضفه
      store.products.push({
        product: product._id,
        quantity: doc.quantity
      });
      console.log(`➕ تم إضافة المنتج بكمية: ${doc.quantity}`);
    }
    
    // 4. احفظ التغييرات
    await store.save();
    console.log('✅ تم تحديث المخزن بنجاح');
    
  } catch (error) {
    console.error('❌ خطأ في تحديث المخزن:', error);
  }
});

export default mongoose.model("Supplier", supplierSchema);
