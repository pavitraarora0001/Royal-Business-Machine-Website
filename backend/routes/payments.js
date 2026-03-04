import express from 'express';
import {
    createPaymentOrder,
    verifyPayment,
    getPaymentHistory,
    getPaymentById,
    downloadInvoice
} from '../controllers/paymentController.js';
import { objectIdValidation, paginationValidation, validate } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

// All payment routes require authentication
router.use(protect);

// Create payment order (Client)
router.post(
    '/create-order',
    [
        body('amount').isNumeric().withMessage('Amount must be a number'),
        body('currency').optional().isString(),
        body('description').optional().isString(),
        validate
    ],
    createPaymentOrder
);

// Verify payment (Client)
router.post(
    '/verify',
    [
        body('orderId').notEmpty().withMessage('Order ID is required'),
        body('razorpayPaymentId').notEmpty().withMessage('Payment ID is required'),
        body('razorpaySignature').notEmpty().withMessage('Signature is required'),
        validate
    ],
    verifyPayment
);

// Get payment history (Client sees own, Admin sees all)
router.get('/history', paginationValidation, getPaymentHistory);

// Get payment by ID
router.get('/:id', objectIdValidation('id'), getPaymentById);

// Download invoice
router.get('/invoice/:id', objectIdValidation('id'), downloadInvoice);

export default router;
