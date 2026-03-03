// src/pages/customers/Customers.jsx
import React, { useState } from 'react';
import { Plus, Search, Phone, Mail, MapPin, Building, User } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [customerType, setCustomerType] = useState('all');

  // بيانات تجريبية
  const customers = [
    {
      id: '1',
      name: 'شركة النور التجارية',
      phone: '0912345678',
      email: 'info@nour.com',
      address: 'الخرطوم - السوق المركزي',
      type: 'شركة',
      balance: 15000,
      creditLimit: 50000,
      isActive: true
    },
    {
      id: '2',
      name: 'محمد أحمد إبراهيم',
      phone: '0987654321',
      email: 'mohamed@email.com',
      address: 'البحري - الحي السكني',
      type: 'فرد',
      balance: -2500,
      creditLimit: 10000,
      isActive: true
    },
    {
      id: '3',
      name: 'أحمد علي',
      phone: '0911223344',
      email: '',
      address: 'أم درمان - السوق الشمالي',
      type: 'فرد',
      balance: 0,
      creditLimit: 5000,
      isActive: false
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (customerType === 'all' || customer.type === customerType)
  );

  const CustomerCard = ({ customer }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${customer.type === 'شركة' ? 'bg-blue-100' : 'bg-green-100'}`}>
              {customer.type === 'شركة' ? (
                <Building className={customer.type === 'شركة' ? 'text-blue-600' : 'text-green-600'} size={24} />
              ) : (
                <User className={customer.type === 'شركة' ? 'text-blue-600' : 'text-green-600'} size={24} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
              <p className="text-sm text-gray-600">{customer.type}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            customer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {customer.isActive ? 'نشط' : 'غير نشط'}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {customer.phone && (
            <div className="flex items-center text-gray-600">
              <Phone size={16} className="ml-2" />
              <span className="text-sm">{customer.phone}</span>
            </div>
          )}
          
          {customer.email && (
            <div className="flex items-center text-gray-600">
              <Mail size={16} className="ml-2" />
              <span className="text-sm">{customer.email}</span>
            </div>
          )}
          
          {customer.address && (
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="ml-2" />
              <span className="text-sm">{customer.address}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">الرصيد</p>
              <p className={`text-lg font-semibold ${customer.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {customer.balance >= 0 ? '+' : ''}{customer.balance.toLocaleString()} SDG
              </p>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">الحد الائتماني</p>
              <p className="text-sm text-gray-600">{customer.creditLimit.toLocaleString()} SDG</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
            فواتير
          </button>
          <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm">
            تعديل
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">العملاء</h1>
          <p className="text-gray-600">إدارة العملاء والموردين في النظام</p>
        </div>
        
        <button
          onClick={() => setShowNewCustomerModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>عميل جديد</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="text-blue-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">إجمالي العملاء</p>
              <p className="text-2xl font-bold text-gray-900">142</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg">
              <Building className="text-green-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">الشركات</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg">
              <User className="text-purple-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">الأفراد</p>
              <p className="text-2xl font-bold text-gray-900">114</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-lg">
              <Mail className="text-red-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">متأخرون</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
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
                placeholder="البحث بالاسم أو الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الأنواع</option>
              <option value="شركة">شركات</option>
              <option value="فرد">أفراد</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(customer => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      {/* New Customer Modal */}
      {showNewCustomerModal && (
        <NewCustomerModal 
          onClose={() => setShowNewCustomerModal(false)} 
        />
      )}
    </div>
  );
};

// نموذج العميل الجديد
const NewCustomerModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    type: 'فرد',
    creditLimit: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating new customer:', formData);
    alert('تم إضافة العميل بنجاح!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">عميل جديد</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اسم العميل"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                النوع *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="فرد">فرد</option>
                <option value="شركة">شركة</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الهاتف
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="رقم الهاتف"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="البريد الإلكتروني"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="العنوان"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحد الائتماني (SDG)
              </label>
              <input
                type="number"
                value={formData.creditLimit}
                onChange={(e) => setFormData({...formData, creditLimit: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              حفظ العميل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customers;
