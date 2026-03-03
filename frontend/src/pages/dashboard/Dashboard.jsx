import React, { useState } from 'react';
import { 
  Wallet, 
  ShoppingCart, 
  CreditCard, 
  AlertTriangle,
  TrendingUp,
  Package
} from 'lucide-react';

const Dashboard = () => {
  // بيانات تجريبية مؤقتة
  const stats = [
    {
      title: 'صندوق النقد',
      value: '45,250',
      currency: 'SDG',
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12% من أمس'
    },
    {
      title: 'إجمالي المبيعات',
      value: '125,500',
      currency: 'SDG',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8% هذا الأسبوع'
    },
    {
      title: 'المبيعات الآجلة',
      value: '23,400',
      currency: 'SDG',
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-3% من الشهر الماضي'
    },
    {
      title: 'المنتجات الحرجة',
      value: '8',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: 'تحت الحد الأدنى'
    }
  ];

  // عمليات بيع التصريف (تجريبية)
  const dischargeSales = [
    { id: 1, customer: 'أحمد محمد', amount: '1,250', time: 'قبل 10 دقائق' },
    { id: 2, customer: 'علي عبدالله', amount: '850', time: 'قبل ساعة' },
    { id: 3, customer: 'محمد علي', amount: '2,100', time: 'قبل 2 ساعة' },
    { id: 4, customer: 'عمر أحمد', amount: '650', time: 'قبل 3 ساعة' }
  ];

  // المنتجات الحرجة (تجريبية)
  const criticalProducts = [
    { id: 1, name: 'زيت ذرة 1 لتر', quantity: 2, minStock: 10 },
    { id: 2, name: 'سكر 1 كيلو', quantity: 0, minStock: 5 },
    { id: 3, name: 'شاي أخضر', quantity: 1, minStock: 3 },
    { id: 4, name: 'صابون غسيل', quantity: 3, minStock: 8 }
  ];

  return (
    <div className="space-y-6">
      {/* العنوان */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">الصفحة الرئيسية </h1>
        <p className="text-gray-600 mt-1">نظرة عامة على النظام </p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white p-5 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {stat.value} {stat.currency && <span className="text-sm">SDG</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* المحتوى الرئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* صندوق النقد والآجل */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">الوضع المالي</h3>
            <Wallet className="text-blue-600" size={20} />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">النقد المتاح</span>
              </div>
              <span className="font-bold text-blue-700">45,250 SDG</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-medium">المبالغ الآجلة</span>
              </div>
              <span className="font-bold text-orange-700">23,400 SDG</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">إجمالي الصندوق</span>
              </div>
              <span className="font-bold text-green-700">68,650 SDG</span>
            </div>
          </div>
        </div>

        {/* عمليات بيع التصريف */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">أحدث عمليات التصريف</h3>
            <ShoppingCart className="text-purple-600" size={20} />
          </div>
          
          <div className="space-y-3">
            {dischargeSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sale.customer}</p>
                  <p className="text-sm text-gray-500">{sale.time}</p>
                </div>
                <span className="font-bold text-purple-600">{sale.amount} SDG</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* المنتجات الحرجة */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">المنتجات الحرجة</h3>
          <AlertTriangle className="text-red-600" size={20} />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتج</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية الحالية</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحد الأدنى</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {criticalProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.quantity === 0 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {product.minStock}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.quantity === 0 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.quantity === 0 ? 'نفذ' : 'منخفض'}
                    </span>
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

export default Dashboard;
