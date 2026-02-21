
// export const createSale = async (req, res, next) => {
  //   try {
    //     // check if store exists
    //     const {products, store, paymentMethod, payed, paymentDate, note, employer, customer   } =req.body
    //     const storeExists = await Store.findById(store).populate("products.product")
    //     if(!storeExists){
      //       return res.status(400).json({message: "المخزن غير موجود"})
//     }
//     // check if employer is exist 
//     const employerExists = await Employer.findById(employer)
//     if(!employerExists){
//       return res.status(400).json({message: "الموظف غير موجود"})
//     }


//     // count total and check pruducts in store
//   let totalPrice = 0
//   for(const item of products) {
//     // chech if product exists
//     const product = await Product.findById(item.product)
//         if(!product){
//           return res.status(400).json({message: `الصنف ${item.productName || "غير معروف"}غير موجود `}) 
//         }
//         // check the quantity in store
//         const storeProduct = storeExists.products.find(
//           p=>p.product._id.toString() === item.product
//         )
//         if(!storeProduct ){
//           return res.status(400).json({message: `الصنف ${item.productName}غير متوفر في المخزن ${storeExists.name}`}) 
//         }
//         if(storeProduct.quantity < item.quantity ){
//           return res.status(400).json({message: `الصنف ${item.productName}غير متوفر بالكمية `}) 
//         }
//         // count total for each product
//         item.total = item.quantity * item.unitPrice
//         totalPrice += item.total
//         // count rest money 
//         const rest_money = totalPrice - (payed || 0)
//         // check status
//         let status = "معلقة" 
//         if (paymentMethod === "نقدي"|| rest_money <= 0) {
//           status = "مكتملة"
//         }else if(paymentDate && new Date(paymentDate) < new Date()) {
//           status = "متأخرة"
//         }else if(paymentMethod === "آجل" || "تصريف"){
//           status = "معلقة"
//         }
//         // check payment date 
//        if(paymentMethod === "آجل"|| "تصريف" &&  paymentDate) {
//         const today = new Date()
//         const payDate = new Date(paymentDate)
//         if(payDate < today) {
//           status = "متأخرة"
//         }
//       }

//   }


//           const newSale = new Sale({
//             products, totalPrice, paymentMethod, 
//             payed: payed||0, 
//             rest_money: rest_money>=0?rest_money:0,
//             paymentDate, status, employer,
//             customer, store, note
//           });
//     const savedSale = await newSale.save();

//     res.status(200).json(savedSale);
//   } catch (err) {
//     next(err);
//   }
// };
import Sale from "../models/Sale.js";
import Store from "../models/Store.js";
import Product from "../models/Product.js";
import Employer from "../models/Employer.js";
     
//! CREATE

export const createSale = async (req, res, next) => {
  try {
    const { products, store, paymentMethod, payed, paymentDate, note, employer, customer } = req.body;

    // 1. التحقق من وجود المخزن
    const storeExists = await Store.findById(store).populate("products.product");
    if (!storeExists) {
      return res.status(400).json({ message: "المخزن غير موجود" });
    }

    // 2. التحقق من وجود الموظف
    const employerExists = await Employer.findById(employer);
    if (!employerExists) {
      return res.status(400).json({ message: "الموظف غير موجود" });
    }

    let totalPrice = 0;
    const saleProducts = [];

    // 3. التحقق من المنتجات وتوفرها في المخزن وحساب الإجماليات
    for (const item of products) {
      // التأكد من أن المنتج موجود في جدول المنتجات
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `المنتج ${item.productName || "غير معروف"} غير موجود` });
      }

      // البحث عن المنتج في المخزن باستخدام productId
    
      const storeProduct = storeExists.products.find(
        (p) => p.product._id.toString() === item.product
      );

      if (!storeProduct) {
        return res.status(400).json({ message: `المنتج ${product.name} غير موجود في هذا المخزن` });
      }

      // التحقق من الكمية المتوفرة
      if (storeProduct.quantity < item.quantity) {
        return res.status(400).json({ message: `المنتج ${product.name} غير متوفر بالكمية المطلوبة` });
      }

      // حساب total لكل منتج
     
      const total = item.quantity * item.unitPrice;
      totalPrice += total;

      saleProducts.push({
        product: item.product,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total,
      });
    }


    // 4. حساب المتبقي (rest_money)
    const rest_money = totalPrice - (payed || 0);

    // 5. تحديد حالة الفاتورة (status)
    let status = "معلقة"; // الحالة الافتراضية

   

    if (paymentMethod === "نقدي" || rest_money <= 0) {
      status = "مكتملة";
    } else if (paymentMethod === "أجل" || paymentMethod === "تصريف") {
      if (paymentDate && new Date(paymentDate) < new Date()) {
        status = "متأخرة";
      } else {
        status = "معلقة"; // لم يحن موعد السداد بعد
      }
    }


    // 6. إنشاء الفاتورة وحفظها
    const newSale = new Sale({
      products: saleProducts,
      totalPrice,
      paymentMethod,
      payed: payed || 0,
      rest_money,
      paymentDate: paymentMethod !== "نقدي" ? paymentDate : null, // إذا كان نقدي، لا نرسل تاريخ
      status,
      employer,
      customer,
      store,
      note,
    });


    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (err) {
    next(err);
  }
};


//! UPDATE

export const updateSale = async (req, res, next) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },

      // update immediately
      { new: true }
    );
    res.status(200).json(updatedSale);
  } catch (err) {
    next(err);
  }
};

//! DELETE

export const deleteSale = async (req, res, next) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.status(200).json(`Sale has been deleted`);
  } catch (err) {
    next(err);
  }
};

//! GET

export const getSale = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);

    res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

//! GET ALL

export const getAllSales = async (req, res, next) => {
  try {
    const sales = await Sale.find()
    .populate("employer", "name")
    .populate("store", "name ")
    .populate("customer", "name ")
    .populate("products.product", "name price");

    res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};



//* ==================== Cashbox Controllers ====================

// جلب إجماليات الخزنة (مجموع حسب طريقة الدفع)
export const getCashTotals = async (req, res, next) => {
  try {
    const totals = await Sale.aggregate([
      {
        $group: {
          _id: null,
          cashTotal: {
            $sum: { $cond: [{ $eq: ["$paymentMethod", "نقدي"] }, "$totalPrice", 0] }
          },
          creditTotal: {
            $sum: { $cond: [{ $eq: ["$paymentMethod", "أجل"] }, "$totalPrice", 0] }
          },
          distributionTotal: {
            $sum: { $cond: [{ $eq: ["$paymentMethod", "تصريف"] }, "$totalPrice", 0] }
          },
          totalRest: { $sum: "$rest_money" }
        }
      }
    ]);

    const result = totals[0] || { cashTotal: 0, creditTotal: 0, distributionTotal: 0, totalRest: 0 };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// جلب تفاصيل الفواتير للخزنة (مع خيار التصفية)
export const getSalesDetails = async (req, res, next) => {
  try {
    const { method, from, to } = req.query; // استقبال الفلاتر من query string

    // بناء فلتر البحث
    let filter = {};
    if (method && method !== "الكل") {
      filter.paymentMethod = method;
    }
    if (from || to) {
      filter.paymentDate = {};
      if (from) filter.paymentDate.$gte = new Date(from);
      if (to) filter.paymentDate.$lte = new Date(to);
    }

    const sales = await Sale.find(filter)
      .populate("employer", "name")
      .populate("store", "name")
      .populate("products.product", "name")
      .populate({ path: "customer", select: "name", strictPopulate: false })
      .sort({ paymentDate: -1, createdAt: -1 });

    // تنسيق النتيجة لعرض اسم العميل بشكل موحد
    const modifiedSales = sales.map(sale => ({
      ...sale._doc,
      customer: sale.customer?.name || sale.customer || "غير محدد"
    }));

    res.status(200).json(modifiedSales);
  } catch (err) {
    next(err);
  }
};

// جلب تفاصيل الفواتير النقدية
export const getCashSalesDetails = async (req, res, next) => {
  try {
    const sales = await Sale.find({ paymentMethod: "نقدي" })
      .populate("employer", "name")
      .populate("store", "name")
      .populate("products.product", "name")
      .populate({ path: "customer", select: "name", strictPopulate: false })
      .sort({ paymentDate: -1, createdAt: -1 });

    const modifiedSales = sales.map(sale => ({
      ...sale._doc,
      customer: sale.customer?.name || sale.customer || "غير محدد"
    }));

    res.status(200).json(modifiedSales);
  } catch (err) {
    next(err);
  }
};

// جلب تفاصيل الفواتير الآجلة
export const getCreditSalesDetails = async (req, res, next) => {
  try {
    const sales = await Sale.find({ paymentMethod: "أجل" })
      .populate("employer", "name")
      .populate("store", "name")
      .populate("products.product", "name")
      .populate({ path: "customer", select: "name", strictPopulate: false })
      .sort({ paymentDate: -1, createdAt: -1 });

    const modifiedSales = sales.map(sale => ({
      ...sale._doc,
      customer: sale.customer?.name || sale.customer || "غير محدد"
    }));

    res.status(200).json(modifiedSales);
  } catch (err) {
    next(err);
  }
};

// جلب تفاصيل فواتير التصريف
export const getDistributionSalesDetails = async (req, res, next) => {
  try {
    const sales = await Sale.find({ paymentMethod: "تصريف" })
      .populate("employer", "name")
      .populate("store", "name")
      .populate("products.product", "name")
      .populate({ path: "customer", select: "name", strictPopulate: false })
      .sort({ paymentDate: -1, createdAt: -1 });

    const modifiedSales = sales.map(sale => ({
      ...sale._doc,
      customer: sale.customer?.name || sale.customer || "غير محدد"
    }));

    res.status(200).json(modifiedSales);
  } catch (err) {
    next(err);
  }
};


// جلب تفاصيل المخططات
export const getChartDetails = async (req, res, next) => {
  
  try {
    const { startDate, endDate, range } = req.query;
    
    let groupFormat;
    let data = [];

    // تحديد تنسيق التجميع حسب النطاق
    if (range === 'week') {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
        dayOfWeek: { $dayOfWeek: "$createdAt" }
      };
    } else if (range === 'month') {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" }
      };
    } else {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      };
    }

    const result = await Sale.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: groupFormat,
          total: { $sum: "$totalPrice" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);

    // تنسيق البيانات للرسم البياني
    data = result.map(item => {
      if (range === 'week') {
        const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return {
          name: days[item._id.dayOfWeek - 1],
          value: item.total,
          fullDate: `${item._id.year}-${item._id.month}-${item._id.day}`
        };
      } else if (range === 'month') {
        return {
          name: `${item._id.day}/${item._id.month}`,
          value: item.total
        };
      } else {
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                       'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        return {
          name: months[item._id.month - 1],
          value: item.total
        };
      }
    });

    res.json({
      success: true,
      data,
      range,
      total: data.reduce((acc, item) => acc + item.value, 0)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



