
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SalesContext = createContext();

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
};

export const SalesProvider = ({ children }) => {
  const { token } = useAuth(); // نفترض أن AuthContext يوفر التوكن
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // دالة مساعدة للإعدادات الافتراضية للـ fetch
  const fetchWithAuth = useCallback(async (url, options = {}) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'حدث خطأ في الطلب');
    }
    return data;
  }, [token]);

  // جلب جميع الفواتير مع إمكانية تمرير بارامترات (مثل ?paymentMethod=cash)
  const fetchSales = useCallback(async (params = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/sales${params ? `?${params}` : ''}`);
      setSales(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth]);

  // جلب فاتورة واحدة بواسطة المعرف
  const fetchSaleById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/sales/${id}`);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth]);

  // إضافة فاتورة جديدة
  const addSale = useCallback(async (saleData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth('/sales', {
        method: 'POST',
        body: JSON.stringify(saleData),
      });
      // إضافة الفاتورة الجديدة إلى القائمة الحالية
      setSales(prev => [data, ...prev]);
      toast.success('تم إضافة الفاتورة بنجاح');
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth]);

  // إلغاء فاتورة (تغيير الحالة إلى cancelled وإعادة الكميات للمخزون)
  const cancelSale = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/sales/${id}/cancel`, {
        method: 'PUT',
      });
      // تحديث حالة الفاتورة في القائمة
      setSales(prev => prev.map(sale =>
        sale._id === id ? { ...sale, status: 'cancelled' } : sale
      ));
      toast.success('تم إلغاء الفاتورة بنجاح');
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth]);

  // تحديث فاتورة (مثلاً عند تسديد دفعة)
  const updateSale = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/sales/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updateData),
      });
      setSales(prev => prev.map(sale =>
        sale._id === id ? { ...sale, ...data } : sale
      ));
      toast.success('تم تحديث الفاتورة بنجاح');
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth]);

  return (
    <SalesContext.Provider
      value={{
        sales,
        loading,
        error,
        fetchSales,
        fetchSaleById,
        addSale,
        cancelSale,
        updateSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};
