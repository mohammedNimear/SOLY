
// src/contexts/EmployersContext.js
import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/axios';

const EmployersContext = createContext();

export const useEmployers = () => {
  const context = useContext(EmployersContext);
  if (!context) {
    throw new Error('useEmployers must be used within an EmployersProvider');
  }
  return context;
};

export const EmployersProvider = ({ children }) => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);

  // جلب جميع الموظفين
  const fetchEmployers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/employers');
      setEmployers(response.data);
    } catch (error) {
      console.error('Error fetching employers:', error);
      toast.error('فشل في تحميل الموظفين');
    } finally {
      setLoading(false);
    }
  };

  // إضافة موظف جديد
  const addEmployer = async (employerData) => {
    try {
      const response = await apiClient.post('/employers', employerData);
      setEmployers(prev => [...prev, response.data]);
      toast.success('تم إضافة الموظف بنجاح');
      return response.data;
    } catch (error) {
      console.error('Error adding employer:', error);
      toast.error('فشل في إضافة الموظف');
      throw error;
    }
  };

  // تحديث بيانات موظف
  const updateEmployer = async (id, employerData) => {
    try {
      const response = await apiClient.put(`/employers/${id}`, employerData);
      setEmployers(prev => prev.map(emp => emp._id === id ? response.data : emp));
      toast.success('تم تحديث بيانات الموظف بنجاح');
      return response.data;
    } catch (error) {
      console.error('Error updating employer:', error);
      toast.error('فشل في تحديث بيانات الموظف');
      throw error;
    }
  };

  // حذف موظف
  const deleteEmployer = async (id) => {
    try {
      await apiClient.delete(`/employers/${id}`);
      setEmployers(prev => prev.filter(emp => emp._id !== id));
      toast.success('تم حذف الموظف بنجاح');
    } catch (error) {
      console.error('Error deleting employer:', error);
      toast.error('فشل في حذف الموظف');
      throw error;
    }
  };

  return (
    <EmployersContext.Provider
      value={{
        employers,
        loading,
        fetchEmployers,
        addEmployer,
        updateEmployer,
        deleteEmployer,
      }}
    >
      {children}
    </EmployersContext.Provider>
  );
};
