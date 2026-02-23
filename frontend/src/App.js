// ========== الصفحات الرئيسية ==========
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

// ========== المكونات الديناميكية ==========
import List from "./pages/list/List";
import Update from "./components/update/Table";

// ========== صفحات خاصة ==========
import CashBox from "./pages/cashBox/CashBox";
import Table from "./components/stockTable/Table";

// ========== مصادر البيانات (في src مباشرة) ==========
import {
  productColumns,
  storeColumns,
  supplierColumns,
  saleColumns,
  customerColumns,
  employerColumns,
} from "./datatablesource";

import {
  empolyerInputs,
  productInputs,
  storeInputs,
  supplierInputs,
  saleInputs,
  customerInputs,
} from "./formSource";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Single from './pages/single/Single';
import New from './pages/new/New';
import NewSale from './pages/newSale/New';

// ========== التخطيط الرئيسي مع Dark Mode ==========
const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
   
  const toggleSidebar = () => {
    setSidebarOpen( prev=>!prev);
  };

 
 
  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Navbar toggleSidebar={toggleSidebar}/>
      <div className="container">
        <Sidebar isOpen={sidebarOpen} />
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// ========== تعريف المسارات (Routes) ==========
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },

      // ===== المنتجات =====
      {
        path: "products",
        children: [
          { index: true, element: <List columns={productColumns} title="المنتجات" /> },
          { path: "new", element: <New inputs={productInputs} title="إضافة منتج" apiEndpoint="/products" /> },
          { path: ":id", element: <Single /> },
          { path: ":id/edit", element: <Update inputs={productInputs} title="تعديل المنتج" /> },
        ],
      },

      // ===== المخازن =====
      {
        path: "stores",
        children: [
          { index: true, element: <List columns={storeColumns} title="المخازن" /> },
          { path: "new", element: <New inputs={storeInputs} title="إضافة مخزن" apiEndpoint="/stores" /> },
          { path: ":id", element: <Single /> },
          { path: ":id/edit", element: <Update inputs={storeInputs} title="تعديل المخزن" /> },
        ],
      },

      // ===== الموردين =====
      {
        path: "suppliers",
        children: [
          { index: true, element: <List columns={supplierColumns} title="الموردين" /> },
          { path: "new", element: <New inputs={supplierInputs} title="إضافة مورد" apiEndpoint="/suppliers" /> },
          { path: ":id", element: <Single /> },
          { path: ":id/edit", element: <Update inputs={supplierInputs} title="تعديل المورد" /> },
        ],
      },

      // ===== المبيعات =====
      {
        path: "sales",
        children: [
          { index: true, element: <List columns={saleColumns} title="المبيعات" /> },
          { path: "new", element: <NewSale inputs={saleInputs} title="إضافة فاتورة" apiEndpoint="/sales" /> },
          { path: ":id", element: <Single /> },
          { path: ":id/edit", element: <Update inputs={saleInputs} title="تعديل الفاتورة" /> },
        ],
      },

      // ===== العملاء =====
      {
        path: "customers",
        children: [
          { index: true, element: <List columns={customerColumns} title="العملاء" /> },
          { path: "new", element: <New inputs={customerInputs} title="إضافة عميل" apiEndpoint="/customers" /> },
          { path: ":id", element: <Single /> },
          { path: ":id/edit", element: <Update inputs={customerInputs} title="تعديل العميل" /> },
        ],
      },

      // ===== الموظفين =====
      {
        path: "employers",
        children: [
          { index: true, element: <List columns={employerColumns} title="الموظفين" /> },
          { path: "new", element: <New inputs={empolyerInputs} title="إضافة موظف" apiEndpoint="/employers" /> },
          { path: ":id", element: <Single /> },
          { path: ":id/edit", element: <Update inputs={empolyerInputs} title="تعديل الموظف" /> },
        ],
      },

      // ===== تفاصيل الصندوق =====
      {
        path: "cashbox",
        element: <CashBox />,
      },

      // ===== الكميات الحرجة =====
      {
        path: "critical-stock",
        element: <Table />,
      },
    ],
  },

  // ===== تسجيل الدخول =====
  {
    path: "/login",
    element: <Login />,
  },
]);

// ========== التطبيق الرئيسي ==========
function App() {
  return <RouterProvider router={router} />;
}

export default App;
