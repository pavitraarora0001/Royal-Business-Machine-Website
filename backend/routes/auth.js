import express from 'express';
import {
    register,
    verifyOTPController,
    login,
    refreshToken,
    forgotPassword,
    resetPassword,
    getMe,
    updateProfile,
    resendOTP
} from '../controllers/authController.js';
import {
    registerValidation,
    loginValidation,
    otpVerificationValidation,
    validate
} from '../middleware/validation.js';
import { protect, verifyRefreshToken } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/verify-otp', otpVerificationValidation, verifyOTPController);
router.post('/login', loginValidation, login);
router.post('/refresh', verifyRefreshToken, refreshToken);

router.post(
    '/forgot-password',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        validate
    ],
    forgotPassword
);

router.post(
    '/reset-password',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
        body('newPassword')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('Password must contain uppercase, lowercase, number, and special character'),
        validate
    ],
    resetPassword
);

router.post(
    '/resend-otp',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('purpose').isIn(['registration', 'password-reset']).withMessage('Invalid purpose'),
        validate
    ],
    resendOTP
);

// Protected routes
router.get('/me', protect, getMe);
router.put(
    '/profile',
    protect,
    [
        body('name').optional().trim().isLength({ min: 2, max: 100 }),
        body('phone').optional().matches(/^[6-9]\d{9}$/),
        body('company').optional().trim(),
        validate
    ],
    updateProfile
);

export default router;
