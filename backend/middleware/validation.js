import { body, param, query, validationResult } from 'express-validator';
import { ValidationError } from './errorHandler.js';

// Validation Result Handler
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join('. ');
        return next(new ValidationError(errorMessages));
    }
    next();
};

// Common Validation Rules
export const emailValidation = body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail();

export const passwordValidation = body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');

export const phoneValidation = body('phone')
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian mobile number');

export const nameValidation = body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces');

export const otpValidation = body('otp')
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers');

// Registration Validation
export const registerValidation = [
    nameValidation,
    emailValidation,
    passwordValidation,
    phoneValidation,
    validate
];

// Login Validation
export const loginValidation = [
    emailValidation,
    body('password').notEmpty().withMessage('Password is required'),
    validate
];

// OTP Verification Validation
export const otpVerificationValidation = [
    emailValidation,
    otpValidation,
    validate
];

// Lead Creation Validation
export const leadValidation = [
    nameValidation,
    emailValidation,
    phoneValidation,
    body('company').optional().trim().isLength({ max: 200 }),
    body('service').optional().trim().isLength({ max: 100 }),
    body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
    validate
];

// Contact Form Validation
export const contactValidation = [
    nameValidation,
    emailValidation,
    phoneValidation,
    body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
    body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
    validate
];

// Service Validation
export const serviceValidation = [
    body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
    body('category').optional().trim().isLength({ max: 100 }),
    body('features').optional().isArray().withMessage('Features must be an array'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    validate
];

// Portfolio Validation
export const portfolioValidation = [
    body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
    body('client').optional().trim().isLength({ max: 200 }),
    body('category').optional().trim().isLength({ max: 100 }),
    body('technologies').optional().isArray().withMessage('Technologies must be an array'),
    validate
];

// MongoDB ObjectId Validation
export const objectIdValidation = (paramName = 'id') => [
    param(paramName).isMongoId().withMessage('Invalid ID format'),
    validate
];

// Pagination Validation
export const paginationValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    validate
];

export default {
    validate,
    registerValidation,
    loginValidation,
    otpVerificationValidation,
    leadValidation,
    contactValidation,
    serviceValidation,
    portfolioValidation,
    objectIdValidation,
    paginationValidation
};
