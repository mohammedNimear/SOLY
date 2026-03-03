import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PublicRoute, ProtectedRoute } from './components/common/ProtectedRoute';
import Login from './pages/login/Login';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Sales from './pages/sales/Sales';
import Products from './pages/products/Products';
import Stores from './pages/stores/Stores';
import StoreDetails from './pages/stores/StoreDetails';
import StoreInventory from './pages/stores/StoreInventory';
import Transfers from './pages/transfers/Transfers';
import Customers from './pages/customers/Customers';
import Invoices from './pages/invoices/Invoices';
import CreateInvoice from './pages/invoices/CreateInvoice';
import InvoiceDetails from './pages/invoices/InvoiceDetails';
import ExpenseManagement from './pages/employees/ExpenseManagement';
import Employees from './pages/employees/Emloyees';
import Suppliers from './pages/supplies/Suppliers';
import Supplies from './pages/supplies/Supplies';

function App() {
  return (
    <div className="h-full w-full overflow-hidden">
      <Toaster 
        position="top-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            direction: 'rtl',
            textAlign: 'right',
            fontFamily: 'inherit',
            fontSize: '14px',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            icon: '✅',
            style: {
              backgroundColor: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
            },
          },
          error: {
            icon: '❌',
            style: {
              backgroundColor: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
            },
          },
          loading: {
            icon: '⏳',
            style: {
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
              border: '1px solid #bfdbfe',
            },
          },
        }}
      />
      
      <Routes>
        {/* المسارات العامة */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* المسارات المحمية */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sales" element={<Sales />} />
          <Route path="products" element={<Products />} />
          <Route path="stores" element={<Stores />} />
          <Route path="stores/:id" element={<StoreDetails />} />
          <Route path="inventory" element={<StoreInventory />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="customers" element={<Customers />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/create" element={<CreateInvoice />} />
          <Route path="invoices/:id" element={<InvoiceDetails />} />
          <Route path="employees" element={<Employees />} />
          <Route path="expenses" element={<ExpenseManagement />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="supplies" element={<Supplies />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
