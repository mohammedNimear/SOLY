
import React, { createContext, useState, useEffect, useContext } from 'react';
import {  useAuth } from './AuthContext';
import {  useCashBox } from './CashBoxContex';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const SuppliesContext = createContext();

export const useSupplies = () => {
  const context = useContext(SuppliesContext);
  if (!context) {
    throw new Error('useSupplies must be used within a SuppliesProvider');
  }
  return context;
}

export const SuppliesProvider = ({ children }) => {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addTransaction } = useCashBox() || {};
  const { user } = useAuth() || {};

  const fetchSupplies = async () => {
    try {
      const { data } = await api.get('/suppliers');
      setSupplies(data);
    } catch (error) {
      console.error('فشل جلب التوريدات', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  const addSupply = async (supplyData) => {
    try {
      const { data: newSupply } = await api.post('/suppliers', {
        ...supplyData,
        employer: user.name, // أو user.id حسب ما يتطلبه الخادم
      });

      // تحديث المخازن محلياً (يمكن إعادة جلب المخازن)
      // إضافة حركة خزنة (سحب)
      await addTransaction('withdraw', supplyData.cost, 'توريد بضاعة', newSupply.id);

      setSupplies(prev => [newSupply, ...prev]);
      toast.success('تم إضافة التوريد بنجاح');
      return newSupply;
    } catch (error) {
      console.error('فشل إضافة التوريد', error);
      toast.error('فشل إضافة التوريد');
      throw error;
    }
  };

  const deleteSupply = async (supplierId) => {
    try {
      const { data } = await api.delete(`/suppliers/${supplierId}`);
      setSupplies(prev => prev.filter(s => s.id !== supplierId));
      toast.success('تم إلغاء التوريد بنجاح');
      return data;
    } catch (error) {
      toast.error('فشل إلغاء التوريد');
      console.error('فشل إلغاء التوريد', error);
      throw error;
    }
  };

  return (
    <SuppliesContext.Provider value={{ supplies, loading, addSupply, deleteSupply, fetchSupplies,  }}>
      {children}
    </SuppliesContext.Provider>
  );
};
