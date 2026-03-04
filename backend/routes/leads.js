import express from 'express';
import {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
    getLeadStats
} from '../controllers/leadController.js';
import { leadValidation, objectIdValidation, paginationValidation } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', leadValidation, createLead);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.get('/stats', getLeadStats);
router.get('/', paginationValidation, getAllLeads);
router.get('/:id', objectIdValidation('id'), getLeadById);
router.patch('/:id', objectIdValidation('id'), updateLead);
router.delete('/:id', objectIdValidation('id'), deleteLead);

export default router;
