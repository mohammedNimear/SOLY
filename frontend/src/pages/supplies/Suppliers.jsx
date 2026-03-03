// src/pages/suppliers/Suppliers.jsx
import React, { useState } from 'react';
import { Plus, Search, Phone, Mail, MapPin, Building, CreditCard } from 'lucide-react';

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewSupplierModal, setShowNewSupplierModal] = useState(false);
  const [supplierType, setSupplierType] = useState('all');

  // بيانات تجريبية
  const suppliers = [
    {
      id: '1',
      name: 'شركة النور التجارية',
      contactPerson: 'محمد أحمد',
      phone: '0912345678',
      email: 'info@nour.com',
      address: 'الخرطوم - السوق المركزي',
      company: 'شركة النور التجارية',
      creditLimit: 100000,
      balance: -25000,
      isActive: true,
      taxNumber: '123456789',
      bankAccount: 'بنك السودان - 0987654321'
    },
    {
      id: '2',
      name: 'شركة الأمان للتجارة',
      contactPerson: 'أحمد علي',
      phone: '0987654321',
      email: 'contact@aman.com',
      address: 'البحري - المنطقة الصناعية',
      company: 'شركة الأمان للتجارة',
      creditLimit: 50000,
      balance: -12000,
      isActive: true,
      taxNumber: '987654321',
      bankAccount: 'بنك قطر الوطني - 1234567890'
    },
    {
      id: '3',
      name: 'شركة السلام للمواد الغذائية',
      contactPerson: 'علي محمود',
      phone: '0911223344',
      email: 'salam@food.com',
      address: 'أم درمان - السوق الشمالي',
      company: 'شركة السلام للمواد الغذائية',
      creditLimit: 75000,
      balance: 0,
      isActive: false,
      taxNumber: '456789123',
      bankAccount: 'بنك التنمية الإسلامي - 5678901234'
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (supplierType === 'all' || (supplierType === 'active' && supplier.isActive) || (supplierType === 'inactive' && !supplier.isActive))
  );

  const SupplierCard = ({ supplier }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-blue-100">
              <Building className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
              <p className="text-sm text-gray-600">{supplier.contactPerson}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            supplier.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {supplier.isActive ? 'نشط' : 'غير نشط'}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {supplier.phone && (
            <div className="flex items-center text-gray-600">
              <Phone size={16} className="ml-2" />
              <span className="text-sm">{supplier.phone}</span>
            </div>
          )}
          
          {supplier.email && (
            <div className="flex items-center text-gray-600">
              <Mail size={16} className="ml-2" />
              <span className="text-sm">{supplier.email}</span>
            </div>
          )}
          
          {supplier.address && (
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="ml-2" />
              <span className="text-sm">{supplier.address}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-gray-500">الحد الائتماني</p>
              <p className="font-semibold text-gray-900">{supplier.creditLimit.toLocaleString()} SDG</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">الرصيد</p>
              <p className={`font-semibold ${supplier.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {supplier.balance < 0 ? '-' : ''}{Math.abs(supplier.balance).toLocaleString()} SDG
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
            توريدات
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
          <h1 className="text-2xl font-bold text-gray-900">الموردون</h1>
          <p className="text-gray-600">إدارة الموردين والمتعاقدين في النظام</p>
        </div>
        
        <button
          onClick={() => setShowNewSupplierModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>مورد جديد</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building className="text-blue-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">إجمالي الموردين</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg">
              <Building className="text-green-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">النشطون</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg">
              <CreditCard className="text-purple-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">إجمالي الديون</p>
              <p className="text-2xl font-bold text-gray-900">452,500</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-orange-100 p-2 rounded-lg">
              <CreditCard className="text-orange-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">متأخرون</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
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
              value={supplierType}
              onChange={(e) => setSupplierType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الموردين</option>
              <option value="active">النشطون</option>
              <option value="inactive">الغير نشطين</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>

      {/* New Supplier Modal */}
      {showNewSupplierModal && (
        <NewSupplierModal 
          onClose={() => setShowNewSupplierModal(false)} 
        />
      )}
    </div>
  );
};

// نموذج المورد الجديد
const NewSupplierModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    company: '',
    taxNumber: '',
    bankAccount: '',
    creditLimit: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating new supplier:', formData);
    alert('تم إضافة المورد بنجاح!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">مورد جديد</h2>
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
                اسم المورد *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اسم المورد"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                جهة الاتصال
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="جهة الاتصال"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الهاتف *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="رقم الهاتف"
                required
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
                الشركة
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اسم الشركة"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الرقم الضريبي
              </label>
              <input
                type="text"
                value={formData.taxNumber}
                onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="الرقم الضريبي"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحساب البنكي
              </label>
              <input
                type="text"
                value={formData.bankAccount}
                onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="رقم الحساب البنكي"
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
              حفظ المورد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Suppliers;
