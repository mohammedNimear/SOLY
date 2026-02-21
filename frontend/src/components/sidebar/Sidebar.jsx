
// client/src/components/sidebar/Sidebar.jsx
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logo from "../../assets/logo.png"
import "./sidebar.scss";
import { AuthContext } from "../../context/AuthContext ";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {user, logout} = useContext(AuthContext); // افترض أن لديك AuthContext لإدارة حالة المستخدم
  const role = user.isAdmin ? "مدير النظام" : "موظف"; // مثال لتحديد الدور بناءً على حالة المستخدم
const navigate = useNavigate();

  // قائمة العناصر في السايد بار
  const menuItems = [
    { 
      path: "/", 
      title: "الرئيسية", 
      icon: <DashboardIcon />,
      exact: true
    },
    { 
      path: "/stores", 
      title: "المخازن", 
      icon: <StoreIcon /> 
    },
    { 
      path: "/products", 
      title: "المنتجات", 
      icon: <InventoryIcon /> 
    },
    { 
      path: "/suppliers", 
      title: "الموردين", 
      icon: <LocalShippingIcon /> 
    },
    { 
      path: "/sales", 
      title: "المبيعات", 
      icon: <PointOfSaleIcon /> 
    },
    { 
      path: "/customers", 
      title: "العملاء", 
      icon: <PeopleIcon /> 
    },
    { 
      path: "/employers", 
      title: "الموظفين", 
      icon: <PersonIcon /> 
    }
  ];

  const bottomMenuItems = [
    { 
      path: "/settings", 
      title: "الإعدادات", 
      icon: <SettingsIcon /> 
    },
    { 
      path: "/logout", 
      title: "تسجيل الخروج", 
      icon: <LogoutIcon />,
      action: () => logout()
    }
  ];

  // التحقق إذا كان الرابط نشط
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`} dir="rtl">
        
        {/* رأس السايد بار */}
        <div className="sidebar-header">
          <div className="logo-container">
            <span className="logo-icon">🛒</span>
            {!collapsed && <span className="brand-name">سولي</span>}
          </div>
          
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>
          
          <button className="close-btn mobile-only" onClick={toggleSidebar}>
            ✕
          </button>
        </div>

        {/* الملف الشخصي المصغر */}
        <div className="user-profile">
          <div className="avatar">
            <PersonIcon />
          </div>
          {!collapsed && (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{role}</span>
            </div>
          )}
        </div>

        {/* القائمة الرئيسية */}
        <div className="sidebar-menu">
          <div className="menu-section">
            {!collapsed && <h3 className="menu-title">الرئيسية</h3>}
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 992) {
                    toggleSidebar();
                  }
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                {!collapsed && <span className="menu-text">{item.title}</span>}
                {isActive(item.path) && !collapsed && <span className="active-indicator"></span>}
              </Link>
            ))}
          </div>
        </div>

        {/* القائمة السفلية */}
        <div className="sidebar-footer">
          {bottomMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={(e) => {
                if (item.action) {
                  e.preventDefault();
                  item.action();

                }
                if (window.innerWidth <= 992) {
                  toggleSidebar();
                }
              }}
            >
              <span className="menu-icon">{item.icon}</span>
              {!collapsed && <span className="menu-text">{item.title}</span>}
            </Link>
          ))}
        </div>

        {/* شعار الشركة في الأسفل */}
        {!collapsed && (
          <div className="sidebar-footer-brand">
            <span className="copyright">© 2026 Soly copyright</span>
            <span className="version">الإصدار 1.0</span>
          </div>
        )}
      </div>

      {/* طبقة خلفية للهاتف */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
