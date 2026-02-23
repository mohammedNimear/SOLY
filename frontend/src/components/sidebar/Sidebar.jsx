import logo from "../../assets/logo.png"


import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; // تأكد من صحة المسار

// أيقونات MUI (يمكنك استبدالها حسب المكتبة التي تستخدمها)
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
import EngineeringIcon from "@mui/icons-material/Engineering"; // للموظفين

// استيراد صورة الشعار (عدل المسار حسب موقع الصورة الفعلية)
// إذا أردت استخدام صورة بدلاً من الأيقونة النصية، قم باستيرادها هنا
// import logo from "../assets/logo.png";

import "./sidebar.scss";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, logout] = useContext(AuthContext); // استخدم AuthContext الخاص بك
  const location = useLocation();
  const navigate = useNavigate();

  // تحديد دور المستخدم (مدير أو مستخدم عادي)
  const role = user?.isAdmin ? "مدير النظام" : "مستخدم";

  // قائمة العناصر الرئيسية في الشريط الجانبي (طبقاً للصورة)
  const menuItems = [
    { path: "/", title: "الرئيسية", icon: <DashboardIcon />, exact: true },
    { path: "/stores", title: "المخازن", icon: <StoreIcon /> },
    { path: "/products", title: "المنتجات", icon: <InventoryIcon /> },
    { path: "/suppliers", title: "الموردين", icon: <LocalShippingIcon /> }, // في صورتك كان "المواد الخشبية" لكن الأفضل "الموردين"
    { path: "/sales", title: "المبيعات", icon: <PointOfSaleIcon /> },
    { path: "/customers", title: "العملاء", icon: <PeopleIcon /> },
    { path: "/employers", title: "الموظفين", icon: <EngineeringIcon /> }, // "الموظفين" بدلاً من "المؤهلين"
  ];

  // القائمة السفلية (إعدادات + تسجيل خروج)
  const bottomMenuItems = [
    { path: "/settings", title: "الإعدادات", icon: <SettingsIcon /> },
    { path: "/logout", title: "تسجيل الخروج", icon: <LogoutIcon />, action: () => logout() },
  ];

  // التحقق إذا كان الرابط نشطاً
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // التعامل مع الضغط على عنصر القائمة (إغلاق الشريط في الموبايل)
  const handleMenuItemClick = () => {
    if (window.innerWidth <= 992) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* طبقة خلفية للموبايل */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${isOpen ? "open" : ""}`}>
        {/* ========== رأس الشريط (الشعار وزر الطي) ========== */}
        <div className="sidebar-header">
          <div className="logo-container">
            {/* هنا يمكنك وضع صورة بدلاً من الأيقونة النصية */}
            <span className="logo-icon">📦</span> {/* أو استخدم <img src={logo} alt="سولي" /> */}
            {!collapsed && <span className="brand-name">سولي</span>}
          </div>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
          <button className="close-btn mobile-only" onClick={toggleSidebar}>
            ✕
          </button>
        </div>

        {/* ========== الملف الشخصي المصغر ========== */}
        <div className="user-profile">
          <div className="avatar">
            <PersonIcon />
          </div>
          {!collapsed && (
            <div className="user-info">
              <span className="user-name">{user?.name || "محمد"}</span>
              <span className="user-role">{role}</span>
            </div>
          )}
        </div>

        {/* ========== القائمة الرئيسية ========== */}
        <nav className="sidebar-menu">
          <div className="menu-section">
            {!collapsed && <h3 className="menu-title">الرئيسية</h3>}
            <ul className="menu-list">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`menu-item ${isActive(item.path) ? "active" : ""}`}
                    onClick={handleMenuItemClick}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    {!collapsed && <span className="menu-text">{item.title}</span>}
                    {isActive(item.path) && !collapsed && <span className="active-indicator" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ========== القائمة السفلية (إعدادات، تسجيل خروج) ========== */}
        <div className="sidebar-bottom">
          {bottomMenuItems.map((item, index) =>
            item.action ? (
              <button
                key={index}
                className="menu-item logout-btn"
                onClick={() => {
                  item.action();
                  handleMenuItemClick();
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                {!collapsed && <span className="menu-text">{item.title}</span>}
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`menu-item ${isActive(item.path) ? "active" : ""}`}
                onClick={handleMenuItemClick}
              >
                <span className="menu-icon">{item.icon}</span>
                {!collapsed && <span className="menu-text">{item.title}</span>}
              </Link>
            )
          )}

          {/* حقوق النشر والإصدار (تظهر فقط عندما يكون الشريط مفتوحاً) */}
          {!collapsed && (
            <div className="sidebar-footer">
              <div className="sidebar-footer-brand">
                <span className="copyright">© 2026 Soly copyright</span>
                <span className="version">الإصدار 1.0</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;











// // client/src/components/sidebar/Sidebar.jsx

// import { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import StoreIcon from "@mui/icons-material/Store";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PeopleIcon from "@mui/icons-material/People";
// import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import "./sidebar.scss";
// import { AuthContext } from "../../context/AuthContext ";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const {user, logout} = useContext(AuthContext); // افترض أن لديك AuthContext لإدارة حالة المستخدم
//   const role = user.isAdmin ? "مدير النظام" : "موظف"; // مثال لتحديد الدور بناءً على حالة المستخدم
// const navigate = useNavigate();

//   // قائمة العناصر في السايد بار
//   const menuItems = [
//     { 
//       path: "/", 
//       title: "الرئيسية", 
//       icon: <DashboardIcon />,
//       exact: true
//     },
//     { 
//       path: "/stores", 
//       title: "المخازن", 
//       icon: <StoreIcon /> 
//     },
//     { 
//       path: "/products", 
//       title: "المنتجات", 
//       icon: <InventoryIcon /> 
//     },
//     { 
//       path: "/suppliers", 
//       title: "الموردين", 
//       icon: <LocalShippingIcon /> 
//     },
//     { 
//       path: "/sales", 
//       title: "المبيعات", 
//       icon: <PointOfSaleIcon /> 
//     },
//     { 
//       path: "/customers", 
//       title: "العملاء", 
//       icon: <PeopleIcon /> 
//     },
//     { 
//       path: "/employers", 
//       title: "الموظفين", 
//       icon: <PersonIcon /> 
//     }
//   ];

//   const bottomMenuItems = [
//     { 
//       path: "/settings", 
//       title: "الإعدادات", 
//       icon: <SettingsIcon /> 
//     },
//     { 
//       path: "/logout", 
//       title: "تسجيل الخروج", 
//       icon: <LogoutIcon />,
//       action: () => logout()
//     }
//   ];

//   // التحقق إذا كان الرابط نشط
//   const isActive = (path) => {
//     if (path === "/") {
//       return location.pathname === path;
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <>
//       <div className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`} dir="rtl">
        
//         {/* رأس السايد بار */}
        
//         <div className="sidebar-header">
//           <div className="logo-container">
//             <span className="logo-icon">🛒</span>
//             {!collapsed && <span className="brand-name">سولي</span>}
//           </div>
          
//           <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
//             {collapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </button>
          
//           <button className="close-btn mobile-only" onClick={toggleSidebar}>
//             ✕
//           </button>
//         </div>

//         {/* الملف الشخصي المصغر */}
//         <div className="user-profile">
//           <div className="avatar">
//             <PersonIcon />
//           </div>
//           {!collapsed && (
//             <div className="user-info">
//               <span className="user-name">{user.name}</span>
//               <span className="user-role">{role}</span>
//             </div>
//           )}
//         </div>

//         {/* القائمة الرئيسية */}
//         <div className="sidebar-menu">
//           <div className="menu-section">
//             {!collapsed && <h3 className="menu-title">الرئيسية</h3>}
//             {menuItems.map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.path}
//                 className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
//                 onClick={() => {
//                   if (window.innerWidth <= 992) {
//                     toggleSidebar();
//                   }
//                 }}
//               >
//                 <span className="menu-icon">{item.icon}</span>
//                 {!collapsed && <span className="menu-text">{item.title}</span>}
//                 {isActive(item.path) && !collapsed && <span className="active-indicator"></span>}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* القائمة السفلية */}
//         <div className="sidebar-footer">
//           {bottomMenuItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
//               onClick={(e) => {
//                 if (item.action) {
//                   e.preventDefault();
//                   item.action();

//                 }
//                 if (window.innerWidth <= 992) {
//                   toggleSidebar();
//                 }
//               }}
//             >
//               <span className="menu-icon">{item.icon}</span>
//               {!collapsed && <span className="menu-text">{item.title}</span>}
//             </Link>
//           ))}
//         </div>

//         {/* شعار الشركة في الأسفل */}
//         {!collapsed && (
//           <div className="sidebar-footer-brand">
//             <span className="copyright">© 2026 Soly copyright</span>
//             <span className="version">الإصدار 1.0</span>
//           </div>
//         )}
//       </div>

//       {/* طبقة خلفية للهاتف */}
//       {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
//     </>
//   );
// };

// export default Sidebar;



// components/sidebar/Sidebar.jsx