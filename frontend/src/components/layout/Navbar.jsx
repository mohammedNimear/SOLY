
// components/Navbar.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Home, ShoppingCart, Users, Truck, 
  Package, BarChart3, Settings, LogOut, User,
  Bell, Moon, Sun, CreditCard, Briefcase
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { DarkModeContext } from '../context/DarkModeContext'; // تأكد من وجود هذا السياق

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { notifications, unreadCount, markAsRead } = useContext(NotificationContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  // حالة القائمة الجانبية (للجوال)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // حالة قائمة الإشعارات
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  // حالة قائمة المستخدم
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // مراجع للعناصر لإغلاق القوائم عند النقر خارجها
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // روابط التنقل الرئيسية
  const navLinks = [
    { to: '/', label: 'الرئيسية', icon: Home },
    { to: '/sales', label: 'المبيعات', icon: ShoppingCart },
    { to: '/customers', label: 'العملاء', icon: Users },
    { to: '/suppliers', label: 'الموردين', icon: Truck },
    { to: '/employees', label: 'الموظفين', icon: Briefcase },
    { to: '/inventory', label: 'المخزون', icon: Package },
    { to: '/reports', label: 'التقارير', icon: BarChart3 },
    { to: '/cashbox', label: 'الصندوق', icon: CreditCard },
    { to: '/settings', label: 'الإعدادات', icon: Settings },
  ];

  // معالجة النقر على الإشعار
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
    setIsNotificationsOpen(false);
  };

  // عرض آخر 5 إشعارات
  const recentNotifications = notifications.slice(0, 5);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50 top-0 right-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* الشعار واسم النظام */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Soly</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Trading</span>
            </Link>
          </div>

          {/* الروابط (تظهر فقط على سطح المكتب) */}
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center space-x-1 rtl:space-x-reverse
                  ${isActive 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`
                }
              >
                <link.icon className="w-4 h-4 ml-1" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* أيقونات الإشعارات والوضع الليلي والمستخدم */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* زر الوضع الليلي */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="تبديل الوضع الليلي"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* قائمة الإشعارات */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none relative"
                aria-label="الإشعارات"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* لوحة الإشعارات */}
              {isNotificationsOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">الإشعارات</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {recentNotifications.length === 0 ? (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-4">لا توجد إشعارات جديدة</p>
                    ) : (
                      recentNotifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`w-full text-right px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            !notification.read ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString('ar-EG')}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
                    <Link
                      to="/notifications"
                      className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      عرض كل الإشعارات
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* قائمة المستخدم */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 rtl:space-x-reverse focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden md:block text-sm text-gray-700 dark:text-gray-200">{user?.name}</span>
              </button>

              {/* القائمة المنسدلة للمستخدم */}
              {isUserMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4 ml-2" />
                    الملف الشخصي
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>

            {/* زر القائمة للجوال */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="القائمة"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* القائمة الجانبية للجوال */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-150
                  ${isActive 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`
                }
              >
                <link.icon className="w-5 h-5 ml-2" />
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
