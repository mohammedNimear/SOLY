// src/pages/supplies/Supplies.jsx
import React, { useState } from 'react';
import { Plus, Search, Filter, Truck, Check, X, FileText } from 'lucide-react';

const Supplies = () => {
  const [showNewSupplyModal, setShowNewSupplyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // بيانات تجريبية
  const supplies = [
    {
      id: '1',
      supplyNumber: 'SUP-20240115-0001',
      supplierName: 'شركة النور التجارية',
      storeName: 'المخزن الرئيسي',
      employeeName: 'أحمد محمد',
      itemsCount: 3,
      totalAmount: 25400,
      status: 'مكتمل',
      receivedDate: '2024-01-15'
    },
    {
      id: '2',
      supplyNumber: 'SUP-20240115-0002',
      supplierName: 'شركة الأمان',
      storeName: 'المخزن الفرعي',
      employeeName: 'سارة أحمد',
      itemsCount: 2,
      totalAmount: 12500,
      status: 'معلق',
      receivedDate: '2024-01-15'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'مقبول': return 'bg-blue-100 text-blue-800';
      case 'معلق': return 'bg-yellow-100 text-yellow-800';
      case 'مرفوض': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">عمليات التوريد</h1>
          <p className="text-gray-600">إدارة جميع عمليات توريد البضاعة من الموردين</p>
        </div>
        
        <button
          onClick={() => setShowNewSupplyModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>توريد جديد</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Truck className="text-blue-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">إجمالي التوريدات</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg">
              <Check className="text-green-600" size={24} />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">مكتملة</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Filter className="text-yellow-600" size={24} />
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
              <p className="text-sm text-gray-600">إجمالي القيمة</p>
              <p className="text-2xl font-bold text-gray-900">452,500</p>
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
                placeholder="البحث برقم التوريد أو اسم المورد..."
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
              <option value="مكتمل">مكتملة</option>
              <option value="مقبول">مقبولة</option>
              <option value="معلق">معلقة</option>
              <option value="مرفوض">مرفوضة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Supplies Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم التوريد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المورد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المخزن
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الأصناف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  القيمة الإجمالية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
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
              {supplies.map((supply) => (
                <tr key={supply.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {supply.supplyNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supply.supplierName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supply.storeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supply.itemsCount} صنف
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {supply.totalAmount.toLocaleString()} SDG
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supply.receivedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supply.status)}`}>
                      {supply.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 ml-4">
                      عرض
                    </button>
                    {supply.status === 'معلق' && (
                      <>
                        <button className="text-green-600 hover:text-green-900 ml-4 flex items-center">
                          <Check size={16} className="ml-1" />
                          قبول
                        </button>
                        <button className="text-red-600 hover:text-red-900 ml-4 flex items-center">
                          <X size={16} className="ml-1" />
                          رفض
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Supply Modal */}
      {showNewSupplyModal && (
        <NewSupplyModal 
          onClose={() => setShowNewSupplyModal(false)} 
        />
      )}
    </div>
  );
};

// نموذج التوريد الجديد
const NewSupplyModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    supplier: '',
    store: '',
    employee: '',
    items: [{ product: '', quantity: 1, unitCost: 0, totalPrice: 0 }],
    discount: 0,
    tax: 0,
    notes: ''
  });

  // بيانات تجريبية
  const suppliers = [
    { id: '1', name: 'شركة النور التجارية' },
    { id: '2', name: 'شركة الأمان' }
  ];

  const stores = [
    { id: '1', name: 'المخزن الرئيسي' },
    { id: '2', name: 'المخزن الفرعي' }
  ];

  const employees = [
    { id: '1', name: 'أحمد محمد' },
    { id: '2', name: 'سارة أحمد' }
  ];

  const products = [
    { id: '1', name: 'زيت ذرة 1 لتر', price: 140 },
    { id: '2', name: 'سكر 1 كيلو', price: 42 },
    { id: '3', name: 'شاي أخضر 100 غرام', price: 75 }
  ];

  // حساب الإجمالي
  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const total = subtotal - formData.discount + formData.tax;
    return { subtotal, total };
  };

  const totals = calculateTotals();

  // تحديث منتج في التوريد
  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    
    if (field === 'product') {
      const product = products.find(p => p.id === value);
      if (product) {
        newItems[index].product = value;
        newItems[index].unitCost = product.price;
        newItems[index].totalPrice = product.price * newItems[index].quantity;
      }
    } else if (field === 'quantity') {
      newItems[index][field] = parseInt(value) || 0;
      newItems[index].totalPrice = newItems[index].unitCost * (parseInt(value) || 0);
    } else {
      newItems[index][field] = value;
      if (field === 'unitCost') {
        newItems[index].totalPrice = (parseFloat(value) || 0) * newItems[index].quantity;
      }
    }
    
    setFormData({ ...formData, items: newItems });
  };

  // إضافة منتج جديد
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', quantity: 1, unitCost: 0, totalPrice: 0 }]
    });
  };

  // حذف منتج
  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating new supply:', formData);
    alert('تم إنشاء عملية التوريد بنجاح!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">توريد جديد</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">معلومات أساسية</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المورد *
                  </label>
                  <select
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر المورد</option>
                    {suppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المخزن *
                  </label>
                  <select
                    value={formData.store}
                    onChange={(e) => setFormData({...formData, store: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر المخزن</option>
                    {stores.map(store => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المشرف المستلم *
                  </label>
                  <select
                    value={formData.employee}
                    onChange={(e) => setFormData({...formData, employee: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر المشرف</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Products */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">الأصناف</h3>
                
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">المنتج</label>
                        <select
                          value={item.product}
                          onChange={(e) => updateItem(index, 'product', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">اختر المنتج</option>
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - {product.price} SDG
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">الكمية</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                          required
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
                        <input
                          type="number"
                          value={item.unitCost}
                          onChange={(e) => updateItem(index, 'unitCost', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">الإجمالي</label>
                        <input
                          type="number"
                          value={item.totalPrice}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      
                      <div className="col-span-1">
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Plus size={16} />
                  <span>إضافة صنف</span>
                </button>

                {/* Totals */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md ml-auto">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الإجمالي الفرعي:</span>
                      <span>{totals.subtotal.toFixed(2)} SDG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الخصم:</span>
                      <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => setFormData({...formData, discount: parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-left"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الضريبة:</span>
                      <input
                        type="number"
                        value={formData.tax}
                        onChange={(e) => setFormData({...formData, tax: parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-left"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t col-span-3">
                      <span>الإجمالي:</span>
                      <span>{totals.total.toFixed(2)} SDG</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Notes and Submit */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">ملاحظات وإتمام</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ملاحظات
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أضف أي ملاحظات حول عملية التوريد..."
                    rows="4"
                  />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">ملخص العملية</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">المورد:</span>
                      <span className="ml-2">{suppliers.find(s => s.id === formData.supplier)?.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">المخزن:</span>
                      <span className="ml-2">{stores.find(s => s.id === formData.store)?.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">الأصناف:</span>
                      <span className="ml-2">{formData.items.length} صنف</span>
                    </div>
                    <div>
                      <span className="text-gray-600">الإجمالي:</span>
                      <span className="ml-2 font-semibold">{totals.total.toFixed(2)} SDG</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <div className="flex space-x-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  السابق
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  التالي
                </button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              {step === 3 && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  حفظ التوريد
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Supplies;
