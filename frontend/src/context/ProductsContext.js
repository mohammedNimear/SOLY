
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api/axios';

export const ProductsContext = createContext();

export const  useProducts = () => {
  const context = useContext(ProductsContext);
    if(!context){
      throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
  }

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('فشل جلب المنتجات', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    const { data } = await apiClient.post('/products', productData);
    setProducts(prev => [...prev, data]);
  };

  const updateProduct = async (id, productData) => {
    const { data } = await apiClient.put(`/products/${id}`, productData);
    setProducts(prev => prev.map(p => p.id === id ? data : p));
  };

  const deleteProduct = async (id) => {
    await apiClient.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
