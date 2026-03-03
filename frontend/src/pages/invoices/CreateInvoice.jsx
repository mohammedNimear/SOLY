// src/pages/invoices/CreateInvoice.jsx
import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, User, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [invoiceData, setInvoiceData] = useState({
    customer: null,
    customerName: '',
    paymentMethod: 'نقداً',
    items: [{ product: '', quantity: 1, unitPrice: 0, totalPrice: 0 }],
    dueDate: ''
  });

  // بيانات تجريبية للمنتجات
  const products = [
    { id: '1', name: 'زيت ذرة 1 لتر', price: 150, sku: 'OIL001' },
    { id: '2', name: 'سكر 1 كيلو', price: 45, sku: 'SUG001' },
    { id: '3', name: 'شاي أخضر 100 غرام', price: 80, sku: 'TEA001' }
  ];

  // بيانات تجريبية للعملاء
  const customers = [
    { id: '1', name: 'شركة النور التجارية', type: 'شركة' },
    { id: '2', name: 'محمد أحمد', type: 'فرد' }
  ];

  // حساب الإجمالي
  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    return {
      subtotal,
      total: subtotal
    };
  };

  const totals = calculateTotals();

  // تحديث منتج في الفاتورة
  const updateItem = (index, field, value) => {
    const newItems = [...invoiceData.items];
    
    if (field === 'product') {
      const product = products.find(p => p.id === value);
      if (product) {
        newItems[index].product = value;
        newItems[index].unitPrice = product.price;
        newItems[index].totalPrice = product.price * newItems[index].quantity;
      }
    } else if (field === 'quantity') {
      newItems[index][field] = parseInt(value) || 0;
      newItems[index].totalPrice = newItems[index].unitPrice * (parseInt(value) || 0);
    } else {
      newItems[index][field] = value;
      if (field === 'unitPrice') {
        newItems[index].totalPrice = (parseFloat(value) || 0) * newItems[index].quantity;
      }
    }
    
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  // إضافة منتج جديد
  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { product: '', quantity: 1, unitPrice: 0, totalPrice: 0 }]
    });
  };

  // حذف منتج
  const removeItem = (index) => {
    if (invoiceData.items.length > 1) {
      const newItems = invoiceData.items.filter((_, i) => i !== index);
      setInvoiceData({ ...invoiceData, items: newItems });
    }
  };

  // حفظ الفاتورة
  const saveInvoice = () => {
    console.log('Saving invoice:', invoiceData);
    alert('تم حفظ الفاتورة بنجاح!');
    navigate('/invoices');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="ml-2" />
          العودة
        </button>
        <h1 className="text-2xl font-bold text-gray-900">فاتورة جديدة</h1>
        <div className="w-24"></div> {/* لل_balance */ }
      </div>

      {/* Steps Indicator */}
      <div className="bg-white rounded-lg shadow border p-4">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && <div className={`w-8 h-0.5 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
          <span className="text-sm text-gray-600 ml-2">الخطوات</span>
        </div>
      </div>

      {/* Step 1: Customer Selection */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">اختيار العميل</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Existing Customer */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">عميل مسجل</h3>
              <select
                value={invoiceData.customer || ''}
                onChange={(e) => setInvoiceData({ ...invoiceData, customer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر عميل</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.type})
                  </option>
                ))}
              </select>
              
              {invoiceData.customer && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    تم اختيار: {customers.find(c => c.id === invoiceData.customer)?.name}
                  </p>
                </div>
              )}
            </div>

            {/* Cash Customer */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">فاتورة نقدية</h3>
              <div className="space-y-3">
                <select
                  value={invoiceData.paymentMethod}
                  onChange={(e) => setInvoiceData({ ...invoiceData, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="نقداً">نقداً</option>
                  <option value="تصريف">تصريف</option>
                </select>
                
                <input
                  type="text"
                  placeholder="اسم العميل (اختياري)"
                  value={invoiceData.customerName}
                  onChange={(e) => setInvoiceData({ ...invoiceData, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setStep(2)}
              disabled={!invoiceData.customer && !invoiceData.customerName}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              التالي
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Add Items */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">إضافة المنتجات</h2>
          
          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">المنتج</label>
                  <select
                    value={item.product}
                    onChange={(e) => updateItem(index, 'product', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر المنتج</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.sku}) - {product.price} SDG
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
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
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
                  {invoiceData.items.length > 1 && (
                    <button
                      onClick={() => removeItem(index)}
                      className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={addItem}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <Plus size={16} />
              <span>إضافة منتج</span>
            </button>
            
            <div className="text-left">
              <p className="text-sm text-gray-600">الإجمالي الفرعي: {totals.subtotal.toFixed(2)} SDG</p>
              <p className="font-semibold">الإجمالي: {totals.total.toFixed(2)} SDG</p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              السابق
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              مراجعة وحفظ
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review and Save */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">مراجعة الفاتورة</h2>
          
          {/* Customer Info */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">معلومات العميل</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">الاسم:</span>
                <span className="ml-2">
                  {invoiceData.customer 
                    ? customers.find(c => c.id === invoiceData.customer)?.name 
                    : invoiceData.customerName || 'عميل نقدي'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">طريقة الدفع:</span>
                <span className="ml-2">{invoiceData.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">المنتجات</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">المنتج</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">الكمية</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoiceData.items.map((item, index) => {
                    const product = products.find(p => p.id === item.product);
                    return (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {product ? product.name : 'غير محدد'}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.totalPrice.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">الإجمالي الفرعي:</span>
              <span>{totals.subtotal.toFixed(2)} SDG</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg mt-2 pt-2 border-t">
              <span>الإجمالي:</span>
              <span>{totals.total.toFixed(2)} SDG</span>
            </div>
          </div>

          {/* Payment Method Specific Fields */}
          {invoiceData.paymentMethod === 'أجل' && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">معلومات الدفع الآجل</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الاستحقاق</label>
                <input
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              السابق
            </button>
            <button
              onClick={saveInvoice}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <Save size={18} />
              <span>حفظ الفاتورة</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
