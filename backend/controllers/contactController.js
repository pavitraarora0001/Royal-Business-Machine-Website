import Contact from '../models/Contact.js';
import { sendContactNotification } from '../services/emailService.js';
import { paginate, getPaginationMeta, getClientIP } from '../utils/helpers.js';
import { NotFoundError } from '../middleware/errorHandler.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Get client IP
        const ipAddress = getClientIP(req);

        // Create contact
        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
            ipAddress
        });

        // Send notification email to admin (don't wait for it)
        sendContactNotification(contact).catch(err =>
            console.error('Failed to send contact notification:', err)
        );

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            data: {
                contact: {
                    id: contact._id,
                    name: contact.name,
                    email: contact.email
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (Admin only)
export const getAllContacts = async (req, res, next) => {
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
                { subject: { $regex: search, $options: 'i' } }
            ];
        }

        // Get contacts with pagination
        const [contacts, total] = await Promise.all([
            Contact.find(query)
                .populate('respondedBy', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Contact.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit);

        res.status(200).json({
            success: true,
            data: { contacts },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Private (Admin only)
export const getContactById = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id)
            .populate('respondedBy', 'name email');

        if (!contact) {
            return next(new NotFoundError('Contact not found'));
        }

        res.status(200).json({
            success: true,
            data: { contact }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark contact as responded
// @route   PATCH /api/contact/:id
// @access  Private (Admin only)
export const updateContact = async (req, res, next) => {
    try {
        const { status, response } = req.body;

        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return next(new NotFoundError('Contact not found'));
        }

        // Update status
        if (status) {
            contact.status = status;
            if (status === 'responded') {
                contact.respondedBy = req.user.id;
                contact.respondedAt = new Date();
            }
        }

        // Add response
        if (response) {
            contact.response = response;
        }

        await contact.save();

        res.status(200).json({
            success: true,
            message: 'Contact updated successfully',
            data: { contact }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin only)
export const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return next(new NotFoundError('Contact not found'));
        }

        await contact.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export default {
    submitContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
};
