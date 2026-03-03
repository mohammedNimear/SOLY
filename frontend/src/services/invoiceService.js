// src/services/invoiceService.js
import apiClient from './api';

const invoiceService = {
  // الحصول على جميع الفواتير
  getAllInvoices: async (params = {}) => {
    try {
      const response = await apiClient.get('/invoices', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'خطأ في جلب الفواتير');
    }
  },

  // إنشاء فاتورة جديدة
  createInvoice: async (invoiceData) => {
    try {
      const response = await apiClient.post('/invoices', invoiceData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'خطأ في إنشاء الفاتورة');
    }
  },

  // الحصول على فاتورة بحسب ID
  getInvoiceById: async (id) => {
    try {
      const response = await apiClient.get(`/invoices/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'خطأ في جلب الفاتورة');
    }
  },

  // تحديث حالة الفاتورة
  updateInvoiceStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/invoices/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'خطأ في تحديث الحالة');
    }
  }
};

export default invoiceService;
