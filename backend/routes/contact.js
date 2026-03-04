import express from 'express';
import {
    submitContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
} from '../controllers/contactController.js';
import { contactValidation, objectIdValidation, paginationValidation } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', contactValidation, submitContact);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.get('/', paginationValidation, getAllContacts);
router.get('/:id', objectIdValidation('id'), getContactById);
router.patch('/:id', objectIdValidation('id'), updateContact);
router.delete('/:id', objectIdValidation('id'), deleteContact);

export default router;
