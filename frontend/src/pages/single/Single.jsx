import "./single.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./single.scss";
import Navbar from "../../components/navbar/Navbar";

const Single = () => {
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname.split('/')[1]; // stores, suppliers, customers, employees, products, sales

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // الأسماء العربية للكيانات
  const entityNames = {
    stores: "مخزن",
    suppliers: "مورد",
    customers: "عميل",
    employees: "موظف",
    products: "منتج",
    sales: "فاتورة"
  };
  const entityName = entityNames[path] || "عنصر";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/${path}/find/${id}`);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "حدث خطأ أثناء جلب البيانات");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path, id]);

  // دوال مساعدة للتنسيق
  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatMoney = (amount) => {
    if (amount === undefined || amount === null) return "—";
    return Number(amount).toLocaleString("ar-EG") + " ج.م";
  };

  if(loading) return <div className="single laoding">جاري التحميل...</div>
    if(error) return <div className="single error">{error}</div>
  if(!data) return <div className="single not-found"> العنصر غير موجود</div>


  const formatLabel = (key) => {
    const labels = {
      _id: "المعرف",
      name: "الاسم",
      location: "الموقع",
      employers_number: "عدد الموظفين",
      products: "المنتجات",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      address: "العنوان",
      price: "السعر",
      category: "التصنيف",
      quantity: "الكمية",
      totalPrice: "الإجمالي",
      paymentMethod: "طريقة الدفع",
      payed: "المدفوع",
      rest_money: "المتبقي",
      status: "الحالة",
      paymentDate: "تاريخ السداد",
      note: "ملاحظات",
      employer: "الموظف",
      customer: "العميل",
      store: "المخزن",
      product_name: "اسم المنتج",
      cost: "التكلفة",
      createdAt: "تاريخ الإنشاء",
      updatedAt: "آخر تحديث",
    };
    return labels[key] || key;
  };

  const formatValue = (key, value) => {
    if (value === null || value === undefined) return "—";
    if (key === "createdAt" || key === "updatedAt" || key === "paymentDate") {
      return formatDate(value);
    }
    if (key === "price" || key === "totalPrice" || key === "payed" || key === "rest_money" || key === "cost") {
      return formatMoney(value);
    }
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        if (value.length === 0) return "لا يوجد";
        return `${value.length} عنصر`;
      }
      // إذا كان كائن علاقة (populated)
      if (value.name) return value.name;
      if (value._id) return value._id;
      return JSON.stringify(value);
    }
    return value.toString();
  };

  if (loading) return <div className="single loading">جار التحميل...</div>;
  if (error) return <div className="single error">{error}</div>;
  if (!data) return <div className="single not-found">العنصر غير موجود</div>;

  // بناء الأقسام ديناميكياً حسب نوع الكيان
  const renderSections = () => {
    const sections = [];

    // ----- القسم الأساسي (معلومات عامة) -----
    const basicFields = [];
    if (data.name) basicFields.push({ key: "name", label: "الاسم", value: data.name });
    if (data.email) basicFields.push({ key: "email", label: "البريد", value: data.email });
    if (data.phone) basicFields.push({ key: "phone", label: "الهاتف", value: data.phone });
    if (data.location) basicFields.push({ key: "location", label: "الموقع", value: data.location });
    if (data.address) basicFields.push({ key: "address", label: "العنوان", value: data.address });
    if (data.employers_number) basicFields.push({ key: "employers_number", label: "عدد الموظفين", value: data.employers_number });
    if (data.price) basicFields.push({ key: "price", label: "السعر", value: formatMoney(data.price) });
    if (data.product_name) basicFields.push({ key: "product_name", label: "اسم المنتج", value: data.product_name });
    if (data.quantity) basicFields.push({ key: "quantity", label: "الكمية", value: data.quantity });
    if (data.cost) basicFields.push({ key: "cost", label: "التكلفة", value: formatMoney(data.cost) });
    if (data.note) basicFields.push({ key: "note", label: "ملاحظات", value: data.note });

    if (basicFields.length > 0) {
      sections.push({
        title: `معلومات ${entityName}`,
        fields: basicFields,
      });
    }

    // ----- قسم العلاقات (كيانات مرتبطة) -----
    if (data.employer && typeof data.employer === "object") {
      sections.push({
        title: "الموظف",
        fields: [
          { key: "employer.name", label: "الاسم", value: data.employer.name },
          { key: "employer.email", label: "البريد", value: data.employer.email },
          { key: "employer.phone", label: "الهاتف", value: data.employer.phone },
        ].filter(f => f.value),
      });
    }
    if (data.store && typeof data.store === "object") {
      sections.push({
        title: "المخزن",
        fields: [
          { key: "store.name", label: "الاسم", value: data.store.name },
          { key: "store.location", label: "الموقع", value: data.store.location },
        ].filter(f => f.value),
      });
    }
    if (data.customer && typeof data.customer === "object") {
      sections.push({
        title: "العميل",
        fields: [
          { key: "customer.name", label: "الاسم", value: data.customer.name },
          { key: "customer.phone", label: "الهاتف", value: data.customer.phone },
        ].filter(f => f.value),
      });
    }
    // إذا كان customer نصاً (غير مرتبط)
    if (data.customer && typeof data.customer === "string") {
      sections.push({
        title: "العميل",
        fields: [{ key: "customer", label: "الاسم", value: data.customer }],
      });
    }

    // ----- قسم المبيعات (إذا كان الكيان هو فاتورة) -----
    if (path === "sales") {
      const saleFields = [];
      if (data.totalPrice) saleFields.push({ key: "totalPrice", label: "الإجمالي", value: formatMoney(data.totalPrice) });
      if (data.paymentMethod) saleFields.push({ key: "paymentMethod", label: "طريقة الدفع", value: data.paymentMethod });
      if (data.payed !== undefined) saleFields.push({ key: "payed", label: "المدفوع", value: formatMoney(data.payed) });
      if (data.rest_money !== undefined) saleFields.push({ key: "rest_money", label: "المتبقي", value: formatMoney(data.rest_money) });
      if (data.status) saleFields.push({ key: "status", label: "الحالة", value: data.status });
      if (data.paymentDate) saleFields.push({ key: "paymentDate", label: "تاريخ السداد", value: formatDate(data.paymentDate) });

      if (saleFields.length > 0) {
        sections.push({
          title: "تفاصيل الفاتورة",
          fields: saleFields,
        });
      }

      // عرض المنتجات في الفاتورة
      if (data.products && data.products.length > 0) {
        sections.push({
          title: "المنتجات",
          fields: [
            {
              key: "products",
              render: () => (
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>المنتج</th>
                      <th>الكمية</th>
                      <th>سعر الوحدة</th>
                      <th>الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.products.map((item, i) => (
                      <tr key={i}>
                        <td>{item.productName || item.product?.name}</td>
                        <td>{item.quantity}</td>
                        <td>{formatMoney(item.unitPrice)}</td>
                        <td>{formatMoney(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ),
            },
          ],
        });
      }
    }

    // ----- قسم المنتجات في المخزن -----
    if (path === "stores" && data.products && data.products.length > 0) {
      sections.push({
        title: "المنتجات في المخزن",
        fields: [
          {
            key: "products",
            render: () => (
              <table className="items-table">
                <thead>
                  <tr>
                    <th>المنتج</th>
                    <th>الكمية</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((item, i) => (
                    <tr key={i}>
                      <td>{item.product?.name || "غير معروف"}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ),
          },
        ],
      });
    }

    // ----- قسم المعلومات الإضافية (الحقول المتبقية) -----
    const excludedKeys = [
      "_id", "__v", "createdAt", "updatedAt", "name", "email", "phone", "location", "address",
      "employers_number", "price", "product_name", "quantity", "cost", "note", "employer", "store",
      "customer", "products", "totalPrice", "paymentMethod", "payed", "rest_money", "status", "paymentDate",
    ];
    const extraFields = Object.keys(data)
      .filter(key => !excludedKeys.includes(key) && typeof data[key] !== "object")
      .map(key => ({
        key,
        label: formatLabel(key),
        value: formatValue(key, data[key]),
      }));

    if (extraFields.length > 0) {
      sections.push({
        title: "معلومات إضافية",
        fields: extraFields,
      });
    }

    // أقسام التواريخ
    const dateFields = [];
    if (data.createdAt) dateFields.push({ key: "createdAt", label: "تاريخ الإنشاء", value: formatDate(data.createdAt) });
    if (data.updatedAt) dateFields.push({ key: "updatedAt", label: "آخر تحديث", value: formatDate(data.updatedAt) });
    if (dateFields.length > 0) {
      sections.push({
        title: "التواريخ",
        fields: dateFields,
      });
    }

    return sections.map((section, idx) => (
      <div key={idx} className="section">
        <h2 className="section-title">{section.title}</h2>
        <div className="section-content">
          {section.fields.map((field, fIdx) => (
            <div key={fIdx} className="field-item">
              <span className="field-label">{field.label}</span>
              <span className="field-value">
                {field.render ? field.render() : field.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <>
    <div className="single">
      <div className="single-container">
        <div className="header">
          <Link to={`/${path}`} className="back-button">
            ← العودة إلى {entityNames[path] || path}
          </Link>
          <Link to={`/${path}/${id}/edit`} className="edit-button">
            تعديل {entityName}
          </Link>
        </div>

        <div className="profile-header">
          <img
            src={data.image || "https://via.placeholder.com/100"}
            alt={data.name || entityName}
            className="profile-avatar"
          />
          <div className="profile-title">
            <h1>{data.name || `${entityName} #${id.slice(-6)}`}</h1>
            <p className="profile-meta">
              {data.email || data.location || (data.createdAt && formatDate(data.createdAt))}
            </p>
          </div>
          <div className="profile-badge">
            <span className="badge">{entityName}</span>
          </div>
        </div>

        <div className="content">{renderSections()}</div>
      </div>
    </div>
    </>
  );
};

export default Single;
