import express from 'express';
import {
    getDashboardStats,
    getAllUsers,
    getUserById,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    getAnalytics
} from '../controllers/adminController.js';
import { objectIdValidation, paginationValidation, validate } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

// Dashboard statistics
router.get('/stats', getDashboardStats);

// Analytics
router.get('/analytics', getAnalytics);

// User management
router.get('/users', paginationValidation, getAllUsers);
router.get('/users/:id', objectIdValidation('id'), getUserById);

// Super admin only routes
router.patch(
    '/users/:id/role',
    restrictTo('super_admin'),
    objectIdValidation('id'),
    [
        body('role').isIn(['client', 'admin', 'super_admin']).withMessage('Invalid role'),
        validate
    ],
    updateUserRole
);

router.patch('/users/:id/status', objectIdValidation('id'), toggleUserStatus);

router.delete(
    '/users/:id',
    restrictTo('super_admin'),
    objectIdValidation('id'),
    deleteUser
);

export default router;
