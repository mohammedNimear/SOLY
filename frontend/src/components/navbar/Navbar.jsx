// client/src/components/navbar/Navbar.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";  // أضف هذا
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";  // أضف هذا
import { AuthContext } from "../../context/AuthContext ";

const Navbar = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const {user, logout} = useContext(AuthContext); // افترض أن لديك AuthContext لإدارة حالة المستخدم

  const role = user.isAdmin ? "مدير النظام" : "موظف"; // مثال لتحديد الدور بناءً على حالة المستخدم  
 
  // الإشعارات
  const notifications = [
    { 
      id: 1, 
      title: "طلب جديد", 
      description: "طلب #12345 من أحمد علي", 
      time: "منذ 5 دقائق", 
      read: false,
      type: "order"
    },
    { 
      id: 2, 
      title: "تحديث مخزون", 
      description: "منتج نفد من المخزون", 
      time: "منذ 15 دقيقة", 
      read: false,
      type: "warning"
    },
    { 
      id: 3, 
      title: "فاتورة جديدة", 
      description: "تم إنشاء فاتورة #6789", 
      time: "منذ ساعة", 
      read: true,
      type: "invoice"
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  // إضافة دالة لتسجيل الخروج
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar" dir="rtl">
      <div className="navbar-container">
        
        {/* الجزء الأيمن - زر القائمة والشعار */}
        
<div className="nav-left">
  <Link to="/" className="logo-link">
    <img src={logo} alt="شعار المتجر" className="logo-image" />
  </Link>
  {/* باقي العناصر مثل زر القائمة إذا أردت */}
  <button className="menu-button">
    <MenuOutlinedIcon />
  </button>
</div>


        {/* الجزء الأوسط - البحث */}
        <div className={`nav-center ${showSearch ? 'mobile-show' : ''}`}>
          <form onSubmit={handleSearch} className="search-wrapper">
            <SearchOutlinedIcon className="search-icon" />
            <input
              type="text"
              placeholder="بحث ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus={showSearch}
            />
            {showSearch && (
              <button 
                type="button"
                className="close-search-btn"
                onClick={() => setShowSearch(false)}
                aria-label="إغلاق البحث"
              >
                <CloseOutlinedIcon />
              </button>
            )}
          </form>
        </div>

        {/* الجزء الأيسر - أيقونات التنقل */}
        <div className="nav-right">
          
          {/* زر البحث للهاتف */}
          <button 
            className="icon-btn mobile-search-btn"
            onClick={() => setShowSearch(true)}
            aria-label="بحث"
          >
            <SearchOutlinedIcon />
          </button>

          {/* وضع الظلام/الفاتح */}
          <button 
  className="icon-btn theme-btn"
  onClick={() => dispatch({ type: "TOGGLE" })}
  aria-label={darkMode ? "الوضع الفاتح" : "الوضع المظلم"}
>
  {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
</button>


          {/* الإشعارات */}
          <div className="notification-wrapper">
            <button 
              className="icon-btn notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="الإشعارات"
            >
              <NotificationsNoneOutlinedIcon />
              {unreadCount > 0 && (
                <span className="badge">{unreadCount}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="dropdown-menu notifications-dropdown">
                <div className="dropdown-header">
                  <h4>الإشعارات</h4>
                  <span className="unread-badge">{unreadCount} جديد</span>
                </div>
                
                <div className="dropdown-body">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`notification-item ${!notif.read ? 'unread' : ''} ${notif.type}`}
                    >
                      <div className="notification-content">
                        <h5>{notif.title}</h5>
                        <p>{notif.description}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="dropdown-footer">
                  <button className="view-all-btn" onClick={() => navigate("/notifications")}>
                    عرض الكل
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* قائمة المستخدم */}
          <div className="user-wrapper">
            <button 
              className="user-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="قائمة المستخدم"
            >
              <div className="user-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <PersonOutlineOutlinedIcon />
                )}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{role}</span>
              </div>
              <ArrowDropDownOutlinedIcon className="dropdown-icon" />
            </button>
            
            {showUserMenu && (
              <div className="dropdown-menu user-dropdown">
                <div className="user-info-header">
                  <div className="user-avatar-large">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <PersonOutlineOutlinedIcon />
                    )}
                  </div>
                  <div className="user-details">
                    <span className="user-fullname">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                    <span className="user-role-badge">{user.role}</span>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                  <PersonOutlineOutlinedIcon />
                  <span>الملف الشخصي</span>
                </Link>
                
                <Link to="/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                  <SettingsOutlinedIcon />
                  <span>الإعدادات</span>
                </Link>
                
                <div className="dropdown-divider"></div>
                
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  <LogoutOutlinedIcon />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* طبقة خلفية عند فتح القوائم */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="overlay"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
