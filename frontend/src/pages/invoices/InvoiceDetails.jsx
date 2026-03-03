// src/pages/invoices/InvoiceDetails.jsx
import React from 'react';
import { ArrowLeft, Printer, Download, Mail } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // بيانات تجريبية - في المستقبل ستؤخذ من الـ API
  const invoice = {
    invoiceNumber: 'INV-20240115-0001',
    customer: {
      name: 'شركة النور التجارية',
      phone: '0912345678',
      email: 'info@nour.com',
      address: 'الخرطوم - السوق المركزي'
    },
    items: [
      { product: 'زيت ذرة 1 لتر', quantity: 5, unitPrice: 150, totalPrice: 750 },
      { product: 'سكر 1 كيلو', quantity: 10, unitPrice: 45, totalPrice: 450 },
      { product: 'شاي أخضر 100 غرام', quantity: 3, unitPrice: 80, totalPrice: 240 }
    ],
    subtotal: 1440,
    discount: 100,
    tax: 42,
    total: 1382,
    paidAmount: 500,
    remainingAmount: 882,
    paymentMethod: 'أجل',
    status: 'معلقة',
    dueDate: '2024-02-15',
    createdAt: '2024-01-15',
    createdBy: 'أحمد محمد'
  };

  // دالة لطباعة الفاتورة
  const handlePrint = () => {
    window.print();
  };

  // دالة لتصدير PDF
  const handleExportPDF = () => {
    alert('سيتم تصدير الفاتورة كملف PDF');
    // في المستقبل سيتم تنفيذ التصدير الفعلي
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="ml-2" />
          العودة
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 print:hidden"
          >
            <Printer size={18} />
            <span>طباعة</span>
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 print:hidden"
          >
            <Download size={18} />
            <span>تصدير PDF</span>
          </button>
        </div>
      </div>

      {/* Invoice Content - Printable Area */}
      <div className="bg-white rounded-lg shadow border p-6 printable-content">
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">فاتورة #{invoice.invoiceNumber}</h1>
            <p className="text-gray-600">تاريخ الإنشاء: {invoice.createdAt}</p>
          </div>
          <div className="text-left">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              invoice.status === 'مدفوعة' ? 'bg-green-100 text-green-800' :
              invoice.status === 'معلقة' ? 'bg-yellow-100 text-yellow-800' :
              invoice.status === 'متأخرة' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Company Info (في المستقبل يمكن إضافة معلومات الشركة) */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">شركة إدارة المخازن</h2>
            <p className="text-gray-600">الخرطوم - السوق المركزي</p>
            <p className="text-gray-600">الهاتف: 0912345678</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">معلومات العميل</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">الاسم:</span> {invoice.customer.name}</p>
              <p><span className="text-gray-600">الهاتف:</span> {invoice.customer.phone}</p>
              <p><span className="text-gray-600">البريد:</span> {invoice.customer.email}</p>
              <p><span className="text-gray-600">العنوان:</span> {invoice.customer.address}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">معلومات الدفع</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">طريقة الدفع:</span> {invoice.paymentMethod}</p>
              {invoice.paymentMethod === 'أجل' && (
                <>
                  <p><span className="text-gray-600">تاريخ الاستحقاق:</span> {invoice.dueDate}</p>
                </>
              )}
              <p><span className="text-gray-600">البائع:</span> {invoice.createdBy}</p>
              <p><span className="text-gray-600">حالة الفاتورة:</span> {invoice.status}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">المنتجات</h3>
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
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.product}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.unitPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md ml-auto">
            <div className="flex justify-between">
              <span className="text-gray-600">الإجمالي الفرعي:</span>
              <span>{invoice.subtotal.toFixed(2)} SDG</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الخصم:</span>
              <span className="text-red-600">-{invoice.discount.toFixed(2)} SDG</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الضريبة:</span>
              <span>{invoice.tax.toFixed(2)} SDG</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t col-span-3">
              <span>الإجمالي:</span>
              <span>{invoice.total.toFixed(2)} SDG</span>
            </div>
            {invoice.paymentMethod !== 'نقداً' && (
              <div className="flex justify-between col-span-3">
                <span className="text-gray-600">المدفوع:</span>
                <span className="text-green-600">{invoice.paidAmount.toFixed(2)} SDG</span>
              </div>
            )}
            {invoice.remainingAmount > 0 && (
              <div className="flex justify-between font-semibold col-span-3">
                <span>المتبقي:</span>
                <span className={invoice.remainingAmount > 0 ? 'text-red-600' : 'text-green-600'}>
                  {invoice.remainingAmount.toFixed(2)} SDG
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 mt-6 text-center text-sm text-gray-500">
          <p>شكراً لثقتكم في خدماتنا</p>
          <p className="mt-1">هذه الفاتورة مُنشأة إلكترونياً ولا تحتاج إلى توقيع</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
