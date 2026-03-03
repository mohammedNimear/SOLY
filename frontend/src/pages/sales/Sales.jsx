import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, ShoppingCart, CreditCard, Users } from 'lucide-react';
import NewSale from './NewSale';
import SaleList from './SaleList';

const Sales = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewSale, setShowNewSale] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // بيانات تجريبية
  const salesStats = [
    {
      title: 'إجمالي المبيعات اليوم',
      amount: '12,500',
      count: '8',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'المبيعات النقدية',
      amount: '8,200',
      count: '5',
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'المبيعات الآجلة',
      amount: '4,300',
      count: '3',
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'مبيعات التصريف',
      amount: '1,800',
      count: '2',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const tabs = [
    { id: 'all', label: 'جميع المبيعات', count: 45 },
    { id: 'cash', label: 'نقدية', count: 25 },
    { id: 'credit', label: 'آجلة', count: 12 },
    { id: 'discharge', label: 'تصريف', count: 8 }
  ];

  return (
    <div className="space-y-6">
      {/* العنوان والأزرار */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المبيعات</h1>
          <p className="text-gray-600 mt-1">تتبع وإدارة جميع عمليات البيع</p>
        </div>
        
        <button
          onClick={() => setShowNewSale(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} className="ml-2" />
          فاتورة جديدة
        </button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {salesStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {stat.amount} SDG
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.count} عملية</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* التبويبات والتصفية */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* تبويبات طرق الدفع */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="mr-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* شريط البحث والتصفية */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث برقم الفاتورة أو اسم العميل..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={16} className="ml-2" />
                تصفية
              </button>
            </div>
          </div>
        </div>

        {/* قائمة المبيعات */}
        <SaleList activeTab={activeTab} searchTerm={searchTerm} />
      </div>

      {/* نافذة إنشاء فاتورة جديدة */}
      {showNewSale && (
        <NewSale onClose={() => setShowNewSale(false)} />
      )}
    </div>
  );
};

export default Sales;
