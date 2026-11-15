import User from '../models/User.js';
import Lead from '../models/Lead.js';
import Service from '../models/Service.js';
import Portfolio from '../models/Portfolio.js';
import Contact from '../models/Contact.js';
import Payment from '../models/Payment.js';
import Blog from '../models/Blog.js';
import Media from '../models/Media.js';
import ClientTestimonial from '../models/ClientTestimonial.js';
import ActivityLog from '../models/ActivityLog.js';
import { paginate, getPaginationMeta } from '../utils/helpers.js';
import { NotFoundError, ValidationError } from '../middleware/errorHandler.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getDashboardStats = async (req, res, next) => {
    try {
        // Get counts
        const [
            totalUsers,
            totalLeads,
            totalServices,
            totalPortfolio,
            totalContacts,
            totalPayments,
            newLeads,
            newContacts,
            successfulPayments,
            totalBlogs,
            totalMedia,
            totalClients
        ] = await Promise.all([
            User.countDocuments(),
            Lead.countDocuments(),
            Service.countDocuments(),
            Portfolio.countDocuments(),
            Contact.countDocuments(),
            Payment.countDocuments(),
            Lead.countDocuments({ status: { $in: ['new', 'contacted'] } }),
            Contact.countDocuments({ status: 'new' }),
            Payment.countDocuments({ status: 'success' }),
            Blog.countDocuments(),
            Media.countDocuments(),
            ClientTestimonial.countDocuments()
        ]);

        // Get revenue
        const revenueData = await Payment.aggregate([
            { $match: { status: 'success' } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$amount' }
                }
            }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // Get lead status breakdown
        const leadsByStatus = await Lead.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get recent activities
        const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);
        const recentPayments = await Payment.find({ status: 'success' })
            .populate('client', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalUsers,
                    totalLeads,
                    totalServices,
                    totalPortfolio,
                    totalContacts,
                    totalPayments,
                    newLeads,
                    newContacts,
                    successfulPayments,
                    totalBlogs,
                    totalMedia,
                    totalClients,
                    totalRevenue
                },
                leadsByStatus,
                recentActivities: {
                    leads: recentLeads,
                    payments: recentPayments
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit);
        const { role, isVerified, search } = req.query;

        // Build query
        const query = {};
        if (role) query.role = role;
        if (isVerified !== undefined) query.isVerified = isVerified === 'true';
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } }
            ];
        }

        // Get users with pagination
        const [users, total] = await Promise.all([
            User.find(query)
                .select('-password')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            User.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit);

        res.status(200).json({
            success: true,
            data: { users },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return next(new NotFoundError('User not found'));
        }

        // Get user's payments
        const payments = await Payment.find({ client: user._id })
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            data: {
                user,
                payments
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private (Super Admin only)
export const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!['client', 'admin', 'super_admin'].includes(role)) {
            return next(new ValidationError('Invalid role'));
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new NotFoundError('User not found'));
        }

        user.role = role;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle user active status
// @route   PATCH /api/admin/users/:id/status
// @access  Private (Admin only)
export const toggleUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new NotFoundError('User not found'));
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isActive: user.isActive
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Super Admin only)
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new NotFoundError('User not found'));
        }

        // Prevent deleting yourself
        if (user._id.toString() === req.user.id) {
            return next(new ValidationError('You cannot delete your own account'));
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private (Admin only)
export const getAnalytics = async (req, res, next) => {
    try {
        const { period = '30' } = req.query; // days
        const days = parseInt(period);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Leads over time
        const leadsOverTime = await Lead.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Revenue over time
        const revenueOverTime = await Payment.aggregate([
            { $match: { createdAt: { $gte: startDate }, status: 'success' } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    revenue: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Service inquiries
        const serviceInquiries = await Lead.aggregate([
            { $match: { service: { $exists: true, $ne: null } } },
            {
                $group: {
                    _id: '$service',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                period: days,
                leadsOverTime,
                revenueOverTime,
                serviceInquiries
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get activity logs
// @route   GET /api/admin/activity-logs
// @access  Private (Admin / Super Admin)
export const getActivityLogs = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit || 30);
        const { module: moduleFilter, action } = req.query;

        const query = {};
        if (moduleFilter) query.module = moduleFilter;
        if (action) query.action = action;

        const [logs, total] = await Promise.all([
            ActivityLog.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            ActivityLog.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit || 30);

        res.status(200).json({
            success: true,
            data: { logs },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new user / admin
// @route   POST /api/admin/users
// @access  Private (Super Admin)
export const createAdminUser = async (req, res, next) => {
    try {
        const { name, email, password, phone, role, company } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ValidationError('User with this email already exists'));
        }

        const user = await User.create({
            name,
            email,
            password: password || 'Royal@Admin2026',
            phone: phone || '9057287689',
            role: role || 'admin',
            company: company || 'Royal Business Machine',
            isVerified: true
        });

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Super Admin',
            userRole: req.user?.role || 'super_admin',
            action: 'CREATE_USER',
            module: 'User Management',
            targetId: user._id.toString(),
            targetName: `${user.name} (${user.role})`,
            ipAddress: req.ip
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getDashboardStats,
    getAllUsers,
    getUserById,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    getAnalytics,
    getActivityLogs,
    createAdminUser
};
