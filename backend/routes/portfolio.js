import express from 'express';
import {
    getAllPortfolio,
    getPortfolioBySlug,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/portfolioController.js';
import { objectIdValidation, paginationValidation } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { uploadPortfolioImages } from '../config/multer.js';

const router = express.Router();

// Public routes
router.get('/categories', getAllCategories);
router.get('/', paginationValidation, getAllPortfolio);
router.get('/:slug', getPortfolioBySlug);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

// Category management (Admin)
router.post('/categories', createCategory);
router.put('/categories/:id', objectIdValidation('id'), updateCategory);
router.delete('/categories/:id', objectIdValidation('id'), deleteCategory);

// Project management (Admin)
router.post('/', uploadPortfolioImages, createPortfolio);
router.put('/:id', uploadPortfolioImages, objectIdValidation('id'), updatePortfolio);
router.delete('/:id', objectIdValidation('id'), deletePortfolio);

export default router;
