import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AuthenticationError, AuthorizationError } from './errorHandler.js';

// Verify JWT Token
export const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AuthenticationError('You are not logged in. Please log in to access this resource.'));
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user still exists
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return next(new AuthenticationError('The user belonging to this token no longer exists.'));
        }

        // Check if user is verified
        if (!user.isVerified) {
            return next(new AuthenticationError('Please verify your email to access this resource.'));
        }

        // Grant access to protected route
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new AuthenticationError('Invalid token. Please log in again.'));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new AuthenticationError('Your token has expired. Please log in again.'));
        }
        next(error);
    }
};

// Restrict to specific roles
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AuthorizationError('You do not have permission to perform this action')
            );
        }
        next();
    };
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            if (user && user.isVerified) {
                req.user = user;
            }
        }
        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};

// Verify refresh token
export const verifyRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return next(new AuthenticationError('Refresh token is required'));
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return next(new AuthenticationError('Invalid refresh token'));
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return next(new AuthenticationError('Invalid or expired refresh token'));
        }
        next(error);
    }
};

export default { protect, restrictTo, optionalAuth, verifyRefreshToken };
