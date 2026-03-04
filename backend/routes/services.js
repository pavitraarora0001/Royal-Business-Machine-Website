import express from 'express';
import {
    getAllServices,
    getServiceBySlug,
    createService,
    updateService,
    deleteService
} from '../controllers/serviceController.js';
import { serviceValidation, objectIdValidation, paginationValidation } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { uploadServiceImage } from '../config/multer.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, getAllServices);
router.get('/:slug', getServiceBySlug);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.post('/', uploadServiceImage, serviceValidation, createService);
router.put('/:id', uploadServiceImage, objectIdValidation('id'), updateService);
router.delete('/:id', objectIdValidation('id'), deleteService);

export default router;
