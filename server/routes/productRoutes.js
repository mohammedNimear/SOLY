import express from 'express';
import { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct,
    searchProducts
} from '../controllers/productController.js';
import { verifyToken, verifyManager } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes عامة
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

// Routes محمية
router.post('/', verifyToken, verifyManager, createProduct);
router.put('/:id', verifyToken, verifyManager, updateProduct);
router.delete('/:id', verifyToken, verifyManager, deleteProduct);

export default router;
