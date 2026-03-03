import React, { useState, useEffect } from 'react';
import { Menu, User, Settings, LogOut, Bell, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';
import logo from '../../assets/logo.png';

const Header = ({ toggleMobileSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [quickStats, setQuickStats] = useState({
    pendingInvoices: 0,
    pendingSupplies: 0,
    criticalProducts: 0,
    unreadNotifications: 0
  });
  
  const navigate = useNavigate();

  // جلب بيانات المستخدم والإحصائيات السريعة
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await apiClient.get('/dashboard/header-data');
        setUserData(response.data.headerData.user);
        setQuickStats(response.data.headerData.quickStats);
      } catch (error) {
        console.error('Error fetching header data:', error);
        // استخدام بيانات افتراضية في حالة الخطأ
        setUserData({
          name: 'مدير النظام',
          role: 'admin'
        });
      }
    };

    fetchHeaderData();
  }, []);

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
    if (showSettingsMenu) setShowSettingsMenu(false);
  };

  const toggleSettingsMenu = (e) => {
    e.stopPropagation();
    setShowSettingsMenu(!showSettingsMenu);
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // تسجيل الخروج محلياً حتى لو فشل الطلب
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
    setShowUserMenu(false);
  };

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = () => {
      if (showUserMenu || showSettingsMenu) {
        setShowUserMenu(false);
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu, showSettingsMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-30 h-16 flex items-center px-4 border-b border-gray-200">
      <div className="flex items-center justify-between w-full">
        {/* زر الهامبورغر في وسط الهيدر للشاشات الصغيرة */}
        <div className="flex items-center">
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* اللوغو في الوسط للشاشات الصغيرة */}
        <div className="flex items-center md:hidden absolute left-1/2 transform -translate-x-1/2">
          <img src={logo} alt="Soly ERP" className="h-8 w-auto" />
        </div>

        {/* اللوغو للشاشات الكبيرة */}
        <div className="hidden md:flex items-center">
          <img src={logo} alt="Soly ERP" className="h-8 w-auto" />
          <span className="mr-2 text-lg font-bold text-blue-600">Soly Trading</span>
        </div>

        {/* الأيقونات اليمنى */}
        <div className="flex items-center space-x-2">
          {/* إيقونة الإشعارات مع العدادات */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative transition-colors">
              <Bell size={20} />
              {(quickStats.pendingInvoices > 0 || 
                quickStats.pendingSupplies > 0 || 
                quickStats.criticalProducts > 0) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {/* القائمة المنبثقة للإحصائيات السريعة */}
            <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 hidden">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">الإشعارات السريعة</h3>
              </div>
              <div className="py-2">
                <div className="px-4 py-2 text-sm text-gray-700 flex justify-between">
                  <span>فواتير معلقة:</span>
                  <span className="font-bold text-orange-600">{quickStats.pendingInvoices}</span>
                </div>
                <div className="px-4 py-2 text-sm text-gray-700 flex justify-between">
                  <span>توريدات معلقة:</span>
                  <span className="font-bold text-blue-600">{quickStats.pendingSupplies}</span>
                </div>
                <div className="px-4 py-2 text-sm text-gray-700 flex justify-between">
                  <span>منتجات حرجة:</span>
                  <span className="font-bold text-red-600">{quickStats.criticalProducts}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* زر الوضع الليلي */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* إيقونة الإعدادات */}
          <div className="relative">
            <button 
              onClick={toggleSettingsMenu}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings size={20} />
            </button>
            
            {showSettingsMenu && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center">
                  <Settings size={16} className="ml-2" />
                  <span>إعدادات النظام</span>
                </button>
                <button className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center">
                  <User size={16} className="ml-2" />
                  <span>إعدادات الحساب</span>
                </button>
                <hr className="my-1 border-gray-200" />
                <button className="w-full text-right px-4 py-2 text-red-600 hover:bg-red-50 flex items-center">
                  <LogOut size={16} className="ml-2" />
                  <span>إعادة التشغيل</span>
                </button>
              </div>
            )}
          </div>
          
          {/* قائمة المستخدم */}
          <div className="relative">
            <button 
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                {userData ? userData.name.charAt(0) : 'م'}
              </div>
            </button>
            
            {showUserMenu && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-bold">
                      {userData ? userData.name.charAt(0) : 'م'}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">
                      {userData ? userData.name : 'مدير النظام'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {userData?.employee?.position || 'مدير عام'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {userData ? userData.email : 'admin@company.com'}
                    </p>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center">
                    <User size={16} className="ml-2" />
                    <span>الملف الشخصي</span>
                  </button>
                  <button className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center">
                    <Settings size={16} className="ml-2" />
                    <span>إعدادات الحساب</span>
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-right px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut size={16} className="ml-2" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
