
import React, { useState, useEffect, useContext } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Package, 
  ShoppingCart, AlertTriangle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { NotificationContext } from './../../context/NotificationContext';
import api from '../services/api';
import { AuthContext } from './../../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todaySales: 0,
    yesterdaySales: 0,
    totalCustomers: 0,
    lowStockCount: 0,
    cashBalance: 0,
    monthlySales: 0
  });
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [exchangeCustomers, setExchangeCustomers] = useState([]); // ← بيانات عملاء التصريف

  // جلب الإحصائيات وبيانات العملاء
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // طلب مواز للإحصائيات العامة
        const statsRes = await api.get('/dashboard/stats');
        setStats(statsRes.data);

        // طلب بيانات الرسم البياني للمبيعات
        const salesRes = await api.get('/dashboard/sales-chart');
        setSalesData(salesRes.data);

        // طلب بيانات الرسم البياني للفئات
        const categoryRes = await api.get('/dashboard/category-chart');
        setCategoryData(categoryRes.data);

        // ⭐ جلب عملاء التصريف (عملاء لديهم معاملات بطريقة دفع "exchange")
        const exchangeRes = await api.get('/customers?payment_method=exchange');
        setExchangeCustomers(exchangeRes.data);

      } catch (error) {
        console.error('خطأ في تحميل بيانات الرئيسية:', error);
        addNotification('error', 'فشل تحميل بيانات الصفحة الرئيسية');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [addNotification]);

  // ألوان ثابتة للرسم البياني الدائري
  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  // حساب نسبة التغيير في المبيعات
  const salesChange = stats.yesterdaySales 
    ? ((stats.todaySales - stats.yesterdaySales) / stats.yesterdaySales * 100).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* الترحيب بالمستخدم */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          مرحباً، {user?.name || 'المستخدم'} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          هذه نظرة عامة على نشاط متجرك اليوم
        </p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* مبيعات اليوم */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">مبيعات اليوم</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.todaySales.toLocaleString()} د.ل
              </p>
            </div>
            <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {salesChange >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 ml-1" />
            )}
            <span className={`text-sm ${salesChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(salesChange)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">مقارنة بالأمس</span>
          </div>
        </div>

        {/* العملاء */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي العملاء</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.totalCustomers}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* كميات حرجة */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">منتجات تحت الحد</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.lowStockCount}
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* رصيد الصندوق */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">رصيد الصندوق</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.cashBalance.toLocaleString()} د.ل
              </p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg">
              <Package className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* الرسم البياني للمبيعات (مساحي) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            حركة المبيعات (آخر 7 أيام)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* الرسم البياني للفئات (دائري) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            توزيع المبيعات حسب الفئة
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ⭐ جدول عملاء التصريف (بدلاً من أحدث الفواتير) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            عملاء التصريف
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            العملاء الذين لديهم معاملات بطريقة دفع "صرف"
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  رقم الهاتف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  إجمالي التصريف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  آخر عملية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {exchangeCustomers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    لا يوجد عملاء تصريف حتى الآن
                  </td>
                </tr>
              ) : (
                exchangeCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {customer.email || '—'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {customer.phone || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {customer.totalExchange?.toLocaleString() || '0'} د.ل
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {customer.lastExchangeDate 
                        ? new Date(customer.lastExchangeDate).toLocaleDateString('ar-EG')
                        : '—'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        نشط
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
