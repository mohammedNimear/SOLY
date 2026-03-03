// src/pages/invoices/Invoices.jsx
import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Calendar, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Invoices = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPayment, setFilterPayment] = useState('all');

    // بيانات تجريبية للفواتير
    const invoices = [
        {
            id: '1',
            invoiceNumber: 'INV-20240115-0001',
            customerName: 'شركة النور التجارية',
            total: 1500,
            paymentMethod: 'أجل',
            status: 'معلقة',
            createdAt: '2024-01-15',
            dueDate: '2024-02-15'
        },
        {
            id: '2',
            invoiceNumber: 'INV-20240115-0002',
            customerName: 'عميل نقدي',
            total: 450,
            paymentMethod: 'نقداً',
            status: 'مدفوعة',
            createdAt: '2024-01-15',
            dueDate: null
        },
        {
            id: '3',
            invoiceNumber: 'INV-20240114-0001',
            customerName: 'محمد أحمد',
            total: 250,
            paymentMethod: 'تصريف',
            status: 'مدفوعة',
            createdAt: '2024-01-14',
            dueDate: null
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'مدفوعة': return 'bg-green-100 text-green-800';
            case 'معلقة': return 'bg-yellow-100 text-yellow-800';
            case 'متأخرة': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentColor = (method) => {
        switch (method) {
            case 'نقداً': return 'bg-blue-100 text-blue-800';
            case 'أجل': return 'bg-purple-100 text-purple-800';
            case 'تصريف': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">الفواتير</h1>
                    <p className="text-gray-600">إدارة جميع فواتير المبيعات في النظام</p>
                </div>

                <button
                    onClick={() => navigate('/invoices/create')}
                    className="btn-primary flex items-center space-x-2"
                >
                    <Plus size={20} />
                    <span>فاتورة جديدة</span>
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">إجمالي الفواتير</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <CreditCard className="text-green-600" size={24} />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">المدفوعة</p>
                            <p className="text-2xl font-bold text-gray-900">18</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex items-center">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                            <Calendar className="text-yellow-600" size={24} />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">معلقة</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <FileText className="text-purple-600" size={24} />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">إجمالي المبيعات</p>
                            <p className="text-2xl font-bold text-gray-900">45,250</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="البحث برقم الفاتورة أو اسم العميل..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">جميع الحالات</option>
                            <option value="مدفوعة">مدفوعة</option>
                            <option value="معلقة">معلقة</option>
                            <option value="متأخرة">متأخرة</option>
                        </select>

                        <select
                            value={filterPayment}
                            onChange={(e) => setFilterPayment(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">جميع الطرق</option>
                            <option value="نقداً">نقداً</option>
                            <option value="أجل">أجل</option>
                            <option value="تصريف">تصريف</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-lg shadow border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    رقم الفاتورة
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    العميل
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    التاريخ
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الإجمالي
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الدفع
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الحالة
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {invoice.customerName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {invoice.createdAt}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {invoice.total.toFixed(2)} SDG
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(invoice.paymentMethod)}`}>
                                            {invoice.paymentMethod}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                            {invoice.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => navigate(`/invoices/${invoice.id}`)}
                                            className="text-blue-600 hover:text-blue-900 ml-4"
                                        >
                                            عرض
                                        </button>
                                        <button className="text-green-600 hover:text-green-900 ml-4">
                                            تعديل
                                        </button>
                                        <button className="text-red-600 hover:text-red-900 ml-4">
                                            حذف
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Invoices;
