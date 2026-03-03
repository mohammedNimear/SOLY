import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Package, TrendingUp } from 'lucide-react';
import NewProduct from './NewProduct';
import EditProductPrice from './EditProductPrice';

const Products = () => {
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [showEditPrice, setShowEditPrice] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // بيانات تجريبية للمنتجات
  const products = [
    {
      id: 1,
      name: 'زيت ذرة 1 لتر',
      sku: 'OIL001',
      category: 'الزيوت',
      price: 150,
      cost: 120,
      stock: 25,
      minStock: 10,
      image: null,
      supplier: 'شركة الزيوت المتحدة'
    },
    {
      id: 2,
      name: 'سكر 1 كيلو',
      sku: 'SUG001',
      category: 'السكر',
      price: 80,
      cost: 65,
      stock: 50,
      minStock: 5,
      image: null,
      supplier: 'شركة السكر الوطنية'
    },
    {
      id: 3,
      name: 'شاي أخضر',
      sku: 'TEA001',
      category: 'الشاي والقهوة',
      price: 250,
      cost: 200,
      stock: 30,
      minStock: 8,
      image: null,
      supplier: 'شركة المشروبات الشرقية'
    },
    {
      id: 4,
      name: 'صابون غسيل',
      sku: 'SOAP001',
      category: 'منظفات',
      price: 120,
      cost: 90,
      stock: 40,
      minStock: 15,
      image: null,
      supplier: 'شركة التنظيف الحديثة'
    },
    {
      id: 5,
      name: 'قهوة فوري',
      sku: 'COFF001',
      category: 'الشاي والقهوة',
      price: 350,
      cost: 280,
      stock: 20,
      minStock: 5,
      image: null,
      supplier: 'شركة المشروبات الشرقية'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الفئات', count: products.length },
    { id: 'الزيوت', name: 'الزيوت', count: products.filter(p => p.category === 'الزيوت').length },
    { id: 'السكر', name: 'السكر', count: products.filter(p => p.category === 'السكر').length },
    { id: 'الشاي والقهوة', name: 'الشاي والقهوة', count: products.filter(p => p.category === 'الشاي والقهوة').length },
    { id: 'منظفات', name: 'منظفات', count: products.filter(p => p.category === 'منظفات').length }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditPrice = (product) => {
    setSelectedProduct(product);
    setShowEditPrice(true);
  };

  // إحصائيات المنتجات
  const productStats = [
    {
      title: 'إجمالي المنتجات',
      value: products.length,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'المنتجات الحرجة',
      value: products.filter(p => p.stock <= p.minStock).length,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'إجمالي المخزون',
      value: products.reduce((sum, p) => sum + p.stock, 0),
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'قيمة المخزون',
      value: products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* العنوان والأزرار */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h1>
          <p className="text-gray-600 mt-1">إدارة وتحديث المنتجات والأسعار</p>
        </div>
        
        <button
          onClick={() => setShowNewProduct(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} className="ml-2" />
          منتج جديد
        </button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {productStats.map((stat, index) => {
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
                    {stat.value} {stat.title.includes('قيمة') && 'SDG'}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* التصفية والبحث */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث باسم المنتج أو SKU..."
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

        {/* فئات المنتجات */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="mr-2 bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* جدول المنتجات */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المنتج
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفئة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  سعر البيع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التكلفة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المخزون
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.supplier}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.price} SDG
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.cost} SDG
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock <= product.minStock
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock} قطعة
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditPrice(product)}
                      className="text-blue-600 hover:text-blue-900 flex items-center mr-3"
                    >
                      <Edit size={16} className="ml-1" />
                      تعديل السعر
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* نوافذ الإضافة والتعديل */}
      {showNewProduct && (
        <NewProduct onClose={() => setShowNewProduct(false)} />
      )}
      
      {showEditPrice && selectedProduct && (
        <EditProductPrice 
          product={selectedProduct} 
          onClose={() => {
            setShowEditPrice(false);
            setSelectedProduct(null);
          }} 
        />
      )}
    </div>
  );
};

export default Products;
