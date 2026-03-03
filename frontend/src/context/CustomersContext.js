// src/contexts/CustomersContext.js
import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/axios';

const CustomersContext = createContext();

export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomersProvider');
  }
  return context;
};

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('فشل في تحميل العملاء');
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customerData) => {
    try {
      const response = await apiClient.post('/customers', customerData);
      setCustomers(prev => [...prev, response.data]);
      toast.success('تم إضافة العميل بنجاح');
      return response.data;
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error('فشل في إضافة العميل');
      throw error;
    }
  };

  const updateCustomer = async (id, customerData) => {
    try {
      const response = await apiClient.put(`/customers/${id}`, customerData);
      setCustomers(prev => prev.map(c => c._id === id ? response.data : c));
      toast.success('تم تحديث العميل بنجاح');
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('فشل في تحديث العميل');
      throw error;
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await apiClient.delete(`/customers/${id}`);
      setCustomers(prev => prev.filter(c => c._id !== id));
      toast.success('تم حذف العميل بنجاح');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('فشل في حذف العميل');
      throw error;
    }
  };

  return (
    <CustomersContext.Provider
      value={{
        customers,
        loading,
        fetchCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
