// src/pages/employees/Employees.jsx
import React, { useState } from 'react';
import { Plus, Search, Phone, Mail, User, Briefcase } from 'lucide-react';

// السطر 9 - إ

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewEmployeeModal, setShowNewEmployeeModal] = useState(false);
  const [employeeRole, setEmployeeRole] = useState('all');
  const [assignmentType, setAssignmentType] = useState('all');

  // بيانات تجريبية
  const employees = [
    {
      id: '1',
      name: 'أحمد محمد',
      position: 'مدير المخزن الرئيسي',
      role: 'مدير',
      assignedTo: 'المخزن الرئيسي',
      assignedType: 'مخزن',
      salary: 15000,
      personalExpenses: 2500,
      commercialExpenses: 1200,
      phone: '0912345678',
      email: 'ahmed@company.com',
      address: 'الخرطوم - السوق المركزي',
      hireDate: '2023-01-15',
      isActive: true
    },
    {
      id: '2',
      name: 'سارة أحمد',
      position: 'موظفة نافذة البيع 1',
      role: 'عامل',
      assignedTo: 'نافذة البيع 1',
      assignedType: 'نافذة',
      salary: 8000,
      personalExpenses: 500,
      commercialExpenses: 300,
      phone: '0987654321',
      email: 'sara@company.com',
      address: 'البحري - الحي السكني',
      hireDate: '2023-03-20',
      isActive: true
    }
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (employeeRole === 'all' || employee.role === employeeRole) &&
    (assignmentType === 'all' || employee.assignedType === assignmentType)
  );

  const EmployeeCard = ({ employee }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${employee.role === 'مدير' ? 'bg-blue-100' : 'bg-green-100'}`}>
              <User className={employee.role === 'مدير' ? 'text-blue-600' : 'text-green-600'} size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-600">{employee.position}</p>
              <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${
                employee.role === 'مدير' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {employee.role}
              </span>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {employee.isActive ? 'نشط' : 'غير نشط'}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Briefcase size={16} className="ml-2" />
            <span className="text-sm">المعين في: {employee.assignedTo}</span>
          </div>
          
          {employee.phone && (
            <div className="flex items-center text-gray-600">
              <Phone size={16} className="ml-2" />
              <span className="text-sm">{employee.phone}</span>
            </div>
          )}
          
          {employee.email && (
            <div className="flex items-center text-gray-600">
              <Mail size={16} className="ml-2" />
              <span className="text-sm">{employee.email}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-gray-500">المرتب</p>
              <p className="font-semibold text-gray-900">{employee.salary.toLocaleString()} SDG</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">المنصرفات</p>
              <p className="text-gray-600">
                {employee.personalExpenses + employee.commercialExpenses} SDG
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
            تفاصيل
          </button>
          <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm">
            تعديل
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">الموظفون</h1>
          <p className="text-gray-600">إدارة الموظفين في النظام</p>
        </div>
        
        <button
          onClick={() => setShowNewEmployeeModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>موظف جديد</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="البحث بالاسم أو الوظيفة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={employeeRole}
              onChange={(e) => setEmployeeRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الأدوار</option>
              <option value="مدير">مدراء</option>
              <option value="عامل">عمال</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {/* New Employee Modal */}
      {showNewEmployeeModal && (
        <NewEmployeeModal 
          onClose={() => setShowNewEmployeeModal(false)} 
        />
      )}
    </div>
  );
};

// نموذج الموظف الجديد
const NewEmployeeModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    role: 'عامل',
    assignedTo: '',
    salary: 0,
    phone: '',
    email: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating new employee:', formData);
    alert('تم إضافة الموظف بنجاح!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">موظف جديد</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اسم الموظف"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوظيفة *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="الوظيفة"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الدور *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="عامل">عامل</option>
                <option value="مدير">مدير</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                التعيين *
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">اختر التعيين</option>
                <optgroup label="المخازن">
                  <option value="المخزن الرئيسي">المخزن الرئيسي</option>
                  <option value="المخزن الفرعي">المخزن الفرعي</option>
                </optgroup>
                <optgroup label="نوافذ البيع">
                  <option value="نافذة البيع 1">نافذة البيع 1</option>
                  <option value="نافذة البيع 2">نافذة البيع 2</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المرتب الشهري (SDG)
              </label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الهاتف
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="رقم الهاتف"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="البريد الإلكتروني"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="العنوان"
                rows="2"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              حفظ الموظف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employees;
