import Lead from '../models/Lead.js';
import { sendLeadNotification } from '../services/emailService.js';
import { paginate, getPaginationMeta, getClientIP } from '../utils/helpers.js';
import { NotFoundError } from '../middleware/errorHandler.js';

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res, next) => {
    try {
        const { name, email, phone, company, service, message } = req.body;

        // Create lead
        const lead = await Lead.create({
            name,
            email,
            phone,
            company,
            service,
            message,
            source: 'website'
        });

        // Send notification email to admin (don't wait for it)
        sendLeadNotification(lead).catch(err =>
            console.error('Failed to send lead notification:', err)
        );

        res.status(201).json({
            success: true,
            message: 'Thank you for your interest! We will contact you soon.',
            data: {
                lead: {
                    id: lead._id,
                    name: lead.name,
                    email: lead.email
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private (Admin only)
export const getAllLeads = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit);
        const { status, search } = req.query;

        // Build query
        const query = {};
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } }
            ];
        }

        // Get leads with pagination
        const [leads, total] = await Promise.all([
            Lead.find(query)
                .populate('assignedTo', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Lead.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit);

        res.status(200).json({
            success: true,
            data: { leads },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get lead by ID
// @route   GET /api/leads/:id
// @access  Private (Admin only)
export const getLeadById = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id)
            .populate('assignedTo', 'name email')
            .populate('notes.addedBy', 'name')
            .populate('statusHistory.changedBy', 'name');

        if (!lead) {
            return next(new NotFoundError('Lead not found'));
        }

        res.status(200).json({
            success: true,
            data: { lead }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id
// @access  Private (Admin only)
export const updateLead = async (req, res, next) => {
    try {
        const { status, assignedTo, note } = req.body;

        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return next(new NotFoundError('Lead not found'));
        }

        // Update status
        if (status) {
            lead.status = status;
        }

        // Update assignment
        if (assignedTo) {
            lead.assignedTo = assignedTo;
        }

        // Add note
        if (note) {
            lead.notes.push({
                note,
                addedBy: req.user.id
            });
        }

        await lead.save();

        res.status(200).json({
            success: true,
            message: 'Lead updated successfully',
            data: { lead }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin only)
export const deleteLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return next(new NotFoundError('Lead not found'));
        }

        await lead.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Lead deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get lead statistics
// @route   GET /api/leads/stats
// @access  Private (Admin only)
export const getLeadStats = async (req, res, next) => {
    try {
        const stats = await Lead.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Lead.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                total,
                byStatus: stats
            }
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
    getLeadStats
};
