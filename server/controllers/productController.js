import Product from '../models/Product.js';
import { createError } from '../utils/error.js';

// إنشاء منتج جديد
export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, cost, category, sku, supplier } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            cost,
            category,
            sku,
            supplier
        });

        res.status(201).json({
            success: true,
            message: 'تم إنشاء المنتج بنجاح',
            product
        });
    } catch (error) {
        next(error);
    }
};

// الحصول على جميع المنتجات
export const getAllProducts = async (req, res, next) => {
    try {
        const { category, supplier } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (supplier) filter.supplier = supplier;

        const products = await Product.find(filter).populate('supplier', 'name');

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        next(error);
    }
};

// البحث عن المنتجات
export const searchProducts = async (req, res, next) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return next(createError(400, 'يرجى إدخال كلمة البحث'));
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { sku: { $regex: q, $options: 'i' } }
            ]
        }).populate('supplier', 'name');

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        next(error);
    }
};

// الحصول على منتج بواسطة ID
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplier', 'name');
        
        if (!product) {
            return next(createError(404, 'المنتج غير موجود'));
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// تحديث المنتج
export const updateProduct = async (req, res, next) => {
    try {
        const { name, description, price, cost, category, sku, supplier } = req.body;
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, cost, category, sku, supplier },
            { new: true, runValidators: true }
        ).populate('supplier', 'name');

        if (!product) {
            return next(createError(404, 'المنتج غير موجود'));
        }

        res.status(200).json({
            success: true,
            message: 'تم تحديث المنتج بنجاح',
            product
        });
    } catch (error) {
        next(error);
    }
};

// حذف المنتج
// حذف المنتج
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return next(createError(404, 'المنتج غير موجود'));
        }

        res.status(200).json({
            success: true,
            message: 'تم حذف المنتج بنجاح'
        });
    } catch (error) {
        next(error);
    }
};

