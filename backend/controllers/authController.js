import User from '../models/User.js';
import { createAndSendOTP, verifyOTP } from '../services/otpService.js';
import { AuthenticationError, ValidationError, ConflictError } from '../middleware/errorHandler.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password, phone, company } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ConflictError('User with this email already exists'));
        }

        // Create user (not verified yet)
        const user = await User.create({
            name,
            email,
            password,
            phone,
            company,
            role: 'client',
            isVerified: false
        });

        // Send OTP for email verification
        await createAndSendOTP(email, 'registration');

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email with the OTP sent to your email address.',
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify OTP and activate account
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTPController = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        // Verify OTP
        const result = await verifyOTP(email, otp, 'registration');

        if (!result.success) {
            return next(new ValidationError(result.message));
        }

        // Update user verification status
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AuthenticationError('User not found'));
        }

        user.isVerified = true;
        await user.save();

        // Generate tokens
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                },
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists and select password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new AuthenticationError('Invalid email or password'));
        }

        // Check if user is verified
        if (!user.isVerified) {
            // Resend OTP
            await createAndSendOTP(email, 'registration');
            return next(new AuthenticationError('Please verify your email. A new OTP has been sent to your email address.'));
        }

        // Check if password matches
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new AuthenticationError('Invalid email or password'));
        }

        // Update last login
        await user.updateLastLogin();

        // Generate tokens
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    company: user.company
                },
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req, res, next) => {
    try {
        // User is already attached by verifyRefreshToken middleware
        const user = req.user;

        // Generate new access token
        const accessToken = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                accessToken
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Forgot password - send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AuthenticationError('No user found with this email address'));
        }

        // Send OTP for password reset
        await createAndSendOTP(email, 'password-reset');

        res.status(200).json({
            success: true,
            message: 'Password reset OTP sent to your email address'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reset password with OTP
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Verify OTP
        const result = await verifyOTP(email, otp, 'password-reset');

        if (!result.success) {
            return next(new ValidationError(result.message));
        }

        // Find user and update password
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AuthenticationError('User not found'));
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful. Please login with your new password.'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    company: user.company,
                    profileImage: user.profileImage,
                    address: user.address,
                    isVerified: user.isVerified,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
    try {
        const { name, phone, company, address } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new AuthenticationError('User not found'));
        }

        // Update fields
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (company) user.company = company;
        if (address) user.address = address;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    company: user.company,
                    address: user.address
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
export const resendOTP = async (req, res, next) => {
    try {
        const { email, purpose } = req.body;

        if (!['registration', 'password-reset'].includes(purpose)) {
            return next(new ValidationError('Invalid OTP purpose'));
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AuthenticationError('User not found'));
        }

        // Send new OTP
        await createAndSendOTP(email, purpose);

        res.status(200).json({
            success: true,
            message: 'OTP resent successfully'
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    verifyOTPController,
    login,
    refreshToken,
    forgotPassword,
    resetPassword,
    getMe,
    updateProfile,
    resendOTP
};
