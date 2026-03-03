import Invoice from '../models/Invoice.js';
import Customer from '../models/Customer.js';
import Product from '../models/Product.js';
import Store from '../models/Store.js';
import { createError } from '../utils/error.js';

// إنشاء فاتورة جديدة
export const createInvoice = async (req, res, next) => {
    try {
        const { customer, customerName, paymentMethod, items, store, note } = req.body;
        
        // التحقق من المخزن
        const storeDoc = await Store.findById(store);
        if (!storeDoc) {
            return next(createError(404, 'المخزن غير موجود'));
        }

        // التحقق من العميل (إذا كان موجوداً)
        let customerDoc = null;
        if (customer) {
            customerDoc = await Customer.findById(customer);
            if (!customerDoc) {
                return next(createError(404, 'العميل غير موجود'));
            }
        }

        // التحقق من توفر المنتجات في المخزن
        const invoiceItems = [];
        let subtotal = 0;

        for (let item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return next(createError(404, `المنتج ${item.product} غير موجود`));
            }

            // التحقق من توفر الكمية في المخزن
            const storeProduct = storeDoc.products.find(p => p.product.toString() === item.product);
            if (!storeProduct || storeProduct.quantity < item.quantity) {
                return next(createError(400, `الكمية غير متوفرة للمنتج ${product.name}`));
            }

            const totalPrice = item.quantity * item.unitPrice;
            subtotal += totalPrice;

            invoiceItems.push({
                product: item.product,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice
            });
        }

        const total = subtotal;

        // حساب المبلغ المدفوع حسب طريقة الدفع
        let paidAmount = 0;
        let status = 'معلقة';
        let dueDate = null;

        if (paymentMethod === 'نقداً') {
            paidAmount = total;
            status = 'مدفوعة';
        } else if (paymentMethod === 'أجل') {
            dueDate = req.body.dueDate;
            status = 'معلقة';
        } else if (paymentMethod === 'تصريف') {
            paidAmount = req.body.paidAmount || 0;
            status = paidAmount >= total ? 'مدفوعة' : 'معلقة';
        }

        // إنشاء رقم الفاتورة
        const today = new Date();
        const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
        const count = await Invoice.countDocuments({
            createdAt: {
                $gte: new Date(today.setHours(0, 0, 0, 0)),
                $lt: new Date(today.setHours(23, 59, 59, 999))
            }
        });
        const invoiceNumber = `INV-${dateStr}-${String(count + 1).padStart(4, '0')}`;

        const invoice = await Invoice.create({
            invoiceNumber,
            customer: customerDoc ? customerDoc._id : null,
            customerName: customerDoc ? customerDoc.name : customerName,
            type: 'بيع',
            paymentMethod,
            items: invoiceItems,
            subtotal,
            total,
            paidAmount,
            dueDate,
            status,
            createdBy: req.user.id,
            store,
            note
        });

        // تحديث كميات المخزن
        for (let item of invoiceItems) {
            const productIndex = storeDoc.products.findIndex(
                p => p.product.toString() === item.product.toString()
            );
            if (productIndex > -1) {
                storeDoc.products[productIndex].quantity -= item.quantity;
            }
        }
        await storeDoc.save();

        res.status(201).json({
            success: true,
            message: 'تم إنشاء الفاتورة بنجاح',
            invoice
        });
    } catch (error) {
        next(error);
    }
};

// الحصول على جميع الفواتير
export const getAllInvoices = async (req, res, next) => {
    try {
        const { status, paymentMethod, customer, startDate, endDate } = req.query;
        let filter = {};

        if (status) filter.status = status;
        if (paymentMethod) filter.paymentMethod = paymentMethod;
        if (customer) filter.customer = customer;
        
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const invoices = await Invoice.find(filter)
            .populate('customer', 'name')
            .populate('createdBy', 'name')
            .populate('store', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: invoices.length,
            invoices
        });
    } catch (error) {
        next(error);
    }
};

// الحصول على الفواتير المعلقة
export const getPendingInvoices = async (req, res, next) => {
    try {
        const invoices = await Invoice.find({ status: 'معلقة' })
            .populate('customer', 'name')
            .populate('createdBy', 'name')
            .populate('store', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: invoices.length,
            invoices
        });
    } catch (error) {
        next(error);
    }
};

// الحصول على فاتورة بواسطة ID
export const getInvoiceById = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('customer', 'name creditLimit')
            .populate('createdBy', 'name')
            .populate('store', 'name')
            .populate('items.product');
        
        if (!invoice) {
            return next(createError(404, 'الفاتورة غير موجودة'));
        }

        res.status(200).json({
            success: true,
            invoice
        });
    } catch (error) {
        next(error);
    }
};

// الحصول على فاتورة برقمها
export const getInvoiceByNumber = async (req, res, next) => {
    try {
        const invoice = await Invoice.findOne({ invoiceNumber: req.params.invoiceNumber })
            .populate('customer', 'name creditLimit')
            .populate('createdBy', 'name')
            .populate('store', 'name')
            .populate('items.product');
        
        if (!invoice) {
            return next(createError(404, 'الفاتورة غير موجودة'));
        }

        res.status(200).json({
            success: true,
            invoice
        });
    } catch (error) {
        next(error);
    }
};

// تحديث الفاتورة
export const updateInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return next(createError(404, 'الفاتورة غير موجودة'));
        }

        // لا يمكن تعديل الفاتورة المدفوعة
        if (invoice.status === 'مدفوعة') {
            return next(createError(400, 'لا يمكن تعديل الفاتورة المدفوعة'));
        }

        const { paidAmount, status, note } = req.body;

        if (paidAmount !== undefined) {
            invoice.paidAmount = paidAmount;
            if (paidAmount >= invoice.total) {
                invoice.status = 'مدفوعة';
            } else if (paidAmount > 0) {
                invoice.status = 'معلقة';
            }
        }

        if (status) invoice.status = status;
        if (note) invoice.note = note;

        await invoice.save();

        res.status(200).json({
            success: true,
            message: 'تم تحديث الفاتورة بنجاح',
            invoice
        });
    } catch (error) {
        next(error);
    }
};

// حذف الفاتورة
export const deleteInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return next(createError(404, 'الفاتورة غير موجودة'));
        }

        // لا يمكن حذف الفاتورة المدفوعة
        if (invoice.status === 'مدفوعة') {
            return next(createError(400, 'لا يمكن حذف الفاتورة المدفوعة'));
        }

        await invoice.remove();

        res.status(200).json({
            success: true,
            message: 'تم حذف الفاتورة بنجاح'
        });
    } catch (error) {
        next(error);
    }
};

// الحصول على المبيعات اليومية
export const getDailySales = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const invoices = await Invoice.find({
            createdAt: { $gte: today },
            status: 'مدفوعة'
        });

        const totalSales = invoices.reduce((sum, inv) => sum + inv.total, 0);
        const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);

        res.status(200).json({
            success: true,
            date: today,
            totalInvoices: invoices.length,
            totalSales,
            totalPaid,
            invoices: invoices.map(inv => ({
                invoiceNumber: inv.invoiceNumber,
                total: inv.total,
                paidAmount: inv.paidAmount
            }))
        });
    } catch (error) {
        next(error);
    }
};
