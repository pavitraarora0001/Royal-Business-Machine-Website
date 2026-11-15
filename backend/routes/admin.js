import express from 'express';
import {
    getDashboardStats,
    getAllUsers,
    getUserById,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    getAnalytics,
    getActivityLogs,
    createAdminUser
} from '../controllers/adminController.js';
import { objectIdValidation, paginationValidation, validate } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

// All admin routes require authentication and admin/super_admin role
router.use(protect);
router.use(restrictTo('admin', 'super_admin', 'editor', 'sales'));

// Dashboard statistics
router.get('/stats', getDashboardStats);

// Analytics
router.get('/analytics', getAnalytics);

// Activity logs
router.get('/activity-logs', getActivityLogs);

// User management
router.get('/users', paginationValidation, getAllUsers);
router.get('/users/:id', objectIdValidation('id'), getUserById);

// Create user
router.post(
    '/users',
    restrictTo('super_admin'),
    [
        body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('role').isIn(['client', 'admin', 'super_admin', 'editor', 'sales']).withMessage('Invalid role'),
        validate
    ],
    createAdminUser
);

// Super admin role update
router.patch(
    '/users/:id/role',
    restrictTo('super_admin'),
    objectIdValidation('id'),
    [
        body('role').isIn(['client', 'admin', 'super_admin', 'editor', 'sales']).withMessage('Invalid role'),
        validate
    ],
    updateUserRole
);

router.patch('/users/:id/status', restrictTo('super_admin', 'admin'), objectIdValidation('id'), toggleUserStatus);

router.delete(
    '/users/:id',
    restrictTo('super_admin'),
    objectIdValidation('id'),
    deleteUser
);

export default router;
