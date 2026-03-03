import express from 'express';
import { 
    createInvoice, 
    getAllInvoices, 
    getInvoiceById, 
    updateInvoice, 
    deleteInvoice,
    getInvoiceByNumber,
    getDailySales,
    getPendingInvoices
} from '../controllers/invoiceController.js';
import { verifyToken, verifyManager } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes عامة
router.get('/', getAllInvoices);
router.get('/daily-sales', getDailySales);
router.get('/pending', getPendingInvoices);
router.get('/number/:invoiceNumber', getInvoiceByNumber);
router.get('/:id', getInvoiceById);

// Routes محمية
router.post('/', verifyToken, createInvoice);
router.put('/:id', verifyToken, updateInvoice);
router.delete('/:id', verifyToken, verifyManager, deleteInvoice);

export default router;
