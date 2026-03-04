import express from 'express';
import {
    getAllPortfolio,
    getPortfolioBySlug,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
} from '../controllers/portfolioController.js';
import { portfolioValidation, objectIdValidation, paginationValidation } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { uploadPortfolioImages } from '../config/multer.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, getAllPortfolio);
router.get('/:slug', getPortfolioBySlug);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.post('/', uploadPortfolioImages, portfolioValidation, createPortfolio);
router.put('/:id', uploadPortfolioImages, objectIdValidation('id'), updatePortfolio);
router.delete('/:id', objectIdValidation('id'), deletePortfolio);

export default router;
