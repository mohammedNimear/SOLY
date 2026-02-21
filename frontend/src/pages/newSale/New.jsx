import { useState, useEffect } from "react";
import axios from "axios";
import "./new.scss"; // نفس التنسيقات

const NewSale = () => {
  // البيانات الأساسية
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]); // جميع المنتجات (للعرض)
  const [customers, setCustomers] = useState([]);
  const [employers, setEmployers] = useState([]);

  // حالة الفاتورة
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("نقدي");
  const [payed, setPayed] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [note, setNote] = useState("");

  // حالة المنتجات المضافة (قائمة)
  const [lineItems, setLineItems] = useState([
    { productId: "", productName: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);

  // رسائل
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // جلب البيانات الأولية
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesRes, productsRes, customersRes, employersRes] = await Promise.all([
          axios.get("/stores"),
          axios.get("/products"),
          axios.get("/customers"),
          axios.get("/employers"),
        ]);
        setStores(storesRes.data);
        setProducts(productsRes.data);
        setCustomers(customersRes.data);
        setEmployers(employersRes.data);
      } catch (err) {
        console.error("خطأ في جلب البيانات", err);
      }
    };
    fetchData();
  }, []);

  // حساب total للسطر
  const calculateLineTotal = (quantity, unitPrice) => quantity * unitPrice;

  // تحديث سطر معين
  const handleLineChange = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = value;

    // إعادة حساب total إذا تغيرت الكمية أو السعر
    if (field === "quantity" || field === "unitPrice") {
      const qty = updated[index].quantity || 0;
      const price = updated[index].unitPrice || 0;
      updated[index].total = calculateLineTotal(qty, price);
    }

    setLineItems(updated);
  };

  // إضافة سطر جديد
  const addLine = () => {
    setLineItems([...lineItems, { productId: "", productName: "", quantity: 1, unitPrice: 0, total: 0 }]);
  };

  // حذف سطر
  const removeLine = (index) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  // حساب المجموع الكلي
  const totalPrice = lineItems.reduce((acc, item) => acc + (item.total || 0), 0);
  const restMoney = totalPrice - payed;

  // عند اختيار منتج من القائمة
  const handleProductSelect = (index, productId) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      const updated = [...lineItems];
      updated[index].productId = product._id;
      updated[index].productName = product.name;
      updated[index].unitPrice = product.price; // تعبئة السعر الافتراضي
      updated[index].total = calculateLineTotal(updated[index].quantity, product.price);
      setLineItems(updated);
    }
  };

  // إرسال الفاتورة
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // التحقق من الحقول الأساسية
    if (!selectedStore) return setErrorMsg("يجب اختيار المخزن");
    if (!selectedEmployer) return setErrorMsg("يجب اختيار الموظف");
    if (lineItems.some((item) => !item.productId)) return setErrorMsg("يجب اختيار منتج لكل سطر");

    const saleData = {
      store: selectedStore,
      employer: selectedEmployer,
      customer: selectedCustomer || undefined, // إذا لم يختار عميلاً، نرسل undefined (أو null)
      paymentMethod,
      payed,
      paymentDate: paymentMethod !== "نقدي" ? paymentDate : null,
      note,
      products: lineItems.map((item) => ({
        product: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
    };

    try {
      await axios.post("/sales", saleData);
      setSuccessMsg("✅ تمت إضافة الفاتورة بنجاح");
      // إعادة تعيين الحقول
      setSelectedStore("");
      setSelectedEmployer("");
      setSelectedCustomer("");
      setPaymentMethod("نقدي");
      setPayed(0);
      setPaymentDate("");
      setNote("");
      setLineItems([{ productId: "", productName: "", quantity: 1, unitPrice: 0, total: 0 }]);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "❌ حدث خطأ أثناء الإضافة");
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>إضافة فاتورة بيع جديدة</h1>
        </div>
        <div className="bottom">
          {successMsg && <div className="success">{successMsg}</div>}
          {errorMsg && <div className="error">{errorMsg}</div>}
          <form onSubmit={handleSubmit}>
            {/* اختيار المخزن */}
            <div className="formInput">
              <label>النافذة </label>
              <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} required>
                <option value="">اختر المخزن</option>
                {stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            {/* اختيار الموظف */}
            <div className="formInput">
              <label>الموظف</label>
              <select value={selectedEmployer} onChange={(e) => setSelectedEmployer(e.target.value)} required>
                <option value="">اختر الموظف</option>
                {employers.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>

            {/* اختيار العميل (اختياري) */}
            <div className="formInput">
              <label>العميل (اختياري)</label>
              <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                <option value="">بدون عميل</option>
                {customers.map((cust) => (
                  <option key={cust._id} value={cust._id}>
                    {cust.name}
                  </option>
                ))}
              </select>
            </div>

            {/* جدول المنتجات */}
            <div className="productsTable">
              <h3>المنتجات</h3>
              {lineItems.map((item, index) => (
                <div key={index} className="productRow">
                  <select
                    value={item.productId}
                    onChange={(e) => handleProductSelect(index, e.target.value)}
                    required
                  >
                    <option value="">اختر منتج</option>
                    {products.map((prod) => (
                      <option key={prod._id} value={prod._id}>
                        {prod.name} - {prod.price}ج.س
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="الكمية"
                    value={item.quantity}
                    onChange={(e) => handleLineChange(index, "quantity", parseFloat(e.target.value) || 0)}
                    min="1"
                    required
                  />
                  <input
                    type="number"
                    placeholder="السعر"
                    value={item.unitPrice}
                    onChange={(e) => handleLineChange(index, "unitPrice", parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    required
                  />
                  <span>الإجمالي: {item.total}</span>
                  <button type="button" onClick={() => removeLine(index)} disabled={lineItems.length === 1}>
                    ✖
                  </button>
                </div>
              ))}
              <button type="button" onClick={addLine}>➕ إضافة منتج</button>
            </div>

            {/* الإجمالي والمتبقي */}
            <div className="totals">
              <p>الإجمالي الكلي: {totalPrice}</p>
              <p>المتبقي: {restMoney}</p>
            </div>

            {/* طريقة الدفع */}
            <div className="formInput">
              <label>طريقة الدفع</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                <option value="نقدي">نقدي</option>
                <option value="أجل">أجل</option>
                <option value="تصريف">تصريف</option>
              </select>
            </div>

            {/* المبلغ المدفوع */}
            <div className="formInput">
              <label>المدفوع</label>
              <input
                type="number"
                value={payed}
                onChange={(e) => setPayed(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* تاريخ السداد (يظهر فقط إذا لم يكن نقدي) */}
            {paymentMethod !== "نقدي" && (
              <div className="formInput">
                <label>تاريخ السداد</label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </div>
            )}

            {/* ملاحظات */}
            <div className="formInput">
              <label>رقم وتاريخ الاشعار</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="1" />
            </div>

            <button type="submit">حفظ الفاتورة</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSale
