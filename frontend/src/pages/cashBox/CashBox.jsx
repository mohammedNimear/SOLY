import "./cashBox.scss";

// Cashbox.jsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const CashBox = () => {
  const [totals, setTotals] = useState({
    cashTotal: 0,
    creditTotal: 0,
    distributionTotal: 0, 
    totalRest: 0,
  });
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    method: "الكل",
    dateFrom: "",
    dateTo: "",
  });

  // جلب البيانات من API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // استدعاء الإحصائيات والتفاصيل معًا
        const [totalsRes, detailsRes] = await Promise.all([
          axios.get("/sales/cash/totals"),
          axios.get("/sales/cash/details"),
        ]);
        setTotals(totalsRes.data);
        setDetails(detailsRes.data);
        setFilteredDetails(detailsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "حدث خطأ في تحميل البيانات");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // دالة التصفية
  const applyFilter = useCallback(() => {
    let filtered = [...details];

    // تصفية حسب طريقة الدفع
    if (filter.method !== "الكل") {
      filtered = filtered.filter((item) => item.paymentMethod === filter.method);
    }

    // تصفية حسب تاريخ البداية
    if (filter.dateFrom) {
      const fromDate = new Date(filter.dateFrom);
      filtered = filtered.filter((item) => new Date(item.paymentDate) >= fromDate);
    }

    // تصفية حسب تاريخ النهاية
    if (filter.dateTo) {
      const toDate = new Date(filter.dateTo);
      filtered = filtered.filter((item) => new Date(item.paymentDate) <= toDate);
    }

    setFilteredDetails(filtered);
  }, [details, filter]);

  // تطبيق التصفية عند تغيير الفلتر
  useEffect(() => {
    applyFilter();
  }, [filter, details, applyFilter]);

  // إعادة تعيين الفلاتر
  const resetFilter = () => {
    setFilter({ method: "الكل", dateFrom: "", dateTo: "" });
  };

  // معالجة تغيير الفلتر
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG");
  };

  // تنسيق العملة
  const formatMoney = (amount) => {
    return amount.toLocaleString("ar-EG") + " ج.م";
  };

  if (loading) {
    return (
      <div className="cashbox">
        <div className="cashbox__container">
          <div className="cashbox__loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cashbox">
        <div className="cashbox__container">
          <div className="cashbox__error">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cashbox">
      <div className="cashbox__container">
        {/* رأس الصفحة */}
        <div className="cashbox__header">
          <h1>الخزنة</h1>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="cashbox__stats">
          <div className="stat-card stat-card--cash">
            <div className="stat-card__icon">💰</div>
            <div className="stat-card__info">
              <h4>إجمالي النقدي</h4>
              <p>{formatMoney(totals.cashTotal)}</p>
            </div>
          </div>
          <div className="stat-card stat-card--credit">
            <div className="stat-card__icon">📅</div>
            <div className="stat-card__info">
              <h4>إجمالي الأجل</h4>
              <p>{formatMoney(totals.creditTotal)}</p>
            </div>
          </div>
          <div className="stat-card stat-card--distribution">
            <div className="stat-card__icon">🔄</div>
            <div className="stat-card__info">
              <h4>إجمالي التصريف</h4>
              <p>{formatMoney(totals.distributionTotal)}</p>
            </div>
          </div>
          <div className="stat-card stat-card--rest">
            <div className="stat-card__icon">⏳</div>
            <div className="stat-card__info">
              <h4>إجمالي المتبقي</h4>
              <p>{formatMoney(totals.totalRest)}</p>
            </div>
          </div>
        </div>

        {/* شريط التصفية */}
        <div className="cashbox__filters">
          <div className="filter-group">
            <label>طريقة الدفع</label>
            <select name="method" value={filter.method} onChange={handleFilterChange}>
              <option value="الكل">الكل</option>
              <option value="نقدي">نقدي</option>
              <option value="أجل">أجل</option>
              <option value="تصريف">تصريف</option>
            </select>
          </div>
          <div className="filter-group">
            <label>من تاريخ</label>
            <input
              type="date"
              name="dateFrom"
              value={filter.dateFrom}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>إلى تاريخ</label>
            <input
              type="date"
              name="dateTo"
              value={filter.dateTo}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-actions">
            <button onClick={applyFilter}>تطبيق</button>
            <button className="reset-btn" onClick={resetFilter}>إعادة تعيين</button>
          </div>
        </div>

        {/* جدول التفاصيل */}
        <div className="cashbox__table">
          {filteredDetails.length === 0 ? (
            <div className="cashbox__empty">
              <p>لا توجد فواتير مطابقة</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>العميل</th>
                  <th>المبلغ</th>
                  <th>طريقة الدفع</th>
                  <th>تاريخ السداد</th>
                  <th>المتبقي</th>
                  <th>ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {filteredDetails.map((sale) => (
                  <tr key={sale._id}>
                    <td>
                      {sale.customer?.name || sale.customer || "غير محدد"}
                    </td>
                    <td>{formatMoney(sale.totalPrice)}</td>
                    <td>
                      <span className={`badge badge--${sale.paymentMethod === "نقدي" ? "cash" : sale.paymentMethod === "أجل" ? "credit" : "distribution"}`}>
                        {sale.paymentMethod}
                      </span>
                    </td>
                    <td>{formatDate(sale.paymentDate)}</td>
                    <td>
                      <span className={`rest-amount ${sale.rest_money === 0 ? "zero" : ""}`}>
                        {formatMoney(sale.rest_money)}
                      </span>
                    </td>
                    <td>{sale.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CashBox;
