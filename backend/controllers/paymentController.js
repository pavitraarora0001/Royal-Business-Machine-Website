import Payment from '../models/Payment.js';
import User from '../models/User.js';
import { createOrder, verifyPaymentSignature } from '../services/paymentService.js';
import { generateInvoice } from '../services/pdfService.js';
import { sendPaymentReceipt } from '../services/emailService.js';
import { paginate, getPaginationMeta } from '../utils/helpers.js';
import { NotFoundError, ValidationError, AuthorizationError } from '../middleware/errorHandler.js';

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private (Client)
export const createPaymentOrder = async (req, res, next) => {
    try {
        const { amount, currency, description, metadata } = req.body;

        if (!amount || amount <= 0) {
            return next(new ValidationError('Invalid amount'));
        }

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create Razorpay order
        const razorpayOrder = await createOrder(amount, currency || 'INR', orderId, {
            clientId: req.user.id,
            description: description || 'Service payment'
        });

        // Save payment record in database
        const payment = await Payment.create({
            orderId,
            razorpayOrderId: razorpayOrder.order.id,
            amount,
            currency: currency || 'INR',
            client: req.user.id,
            description,
            metadata,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Payment order created successfully',
            data: {
                orderId: payment.orderId,
                razorpayOrderId: payment.razorpayOrderId,
                amount: payment.amount,
                currency: payment.currency,
                razorpayKeyId: process.env.RAZORPAY_KEY_ID
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Private (Client)
export const verifyPayment = async (req, res, next) => {
    try {
        const { orderId, razorpayPaymentId, razorpaySignature } = req.body;

        if (!orderId || !razorpayPaymentId || !razorpaySignature) {
            return next(new ValidationError('Missing payment verification details'));
        }

        // Find payment record
        const payment = await Payment.findOne({ orderId });
        if (!payment) {
            return next(new NotFoundError('Payment order not found'));
        }

        // Verify payment signature
        const isValid = verifyPaymentSignature(
            payment.razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
        );

        if (!isValid) {
            payment.status = 'failed';
            await payment.save();
            return next(new ValidationError('Invalid payment signature'));
        }

        // Update payment record
        payment.razorpayPaymentId = razorpayPaymentId;
        payment.razorpaySignature = razorpaySignature;
        payment.status = 'success';
        await payment.save();

        // Get user details
        const user = await User.findById(payment.client);

        // Generate invoice
        const invoice = await generateInvoice(payment, user);
        payment.invoice = {
            invoiceNumber: invoice.invoiceNumber,
            invoicePath: invoice.filepath,
            generatedAt: new Date()
        };
        await payment.save();

        // Send payment receipt email (don't wait for it)
        sendPaymentReceipt(payment, user, invoice.filepath).catch(err =>
            console.error('Failed to send payment receipt:', err)
        );

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            data: {
                payment: {
                    orderId: payment.orderId,
                    amount: payment.amount,
                    status: payment.status,
                    invoiceNumber: payment.invoice.invoiceNumber
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private (Client/Admin)
export const getPaymentHistory = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit);
        const { status } = req.query;

        // Build query
        const query = {};

        // If user is client, only show their payments
        if (req.user.role === 'client') {
            query.client = req.user.id;
        }

        // Filter by status if provided
        if (status) {
            query.status = status;
        }

        // Get payments with pagination
        const [payments, total] = await Promise.all([
            Payment.find(query)
                .populate('client', 'name email phone')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Payment.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit);

        res.status(200).json({
            success: true,
            data: { payments },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private (Client/Admin)
export const getPaymentById = async (req, res, next) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('client', 'name email phone company');

        if (!payment) {
            return next(new NotFoundError('Payment not found'));
        }

        // If user is client, ensure they own this payment
        if (req.user.role === 'client' && payment.client._id.toString() !== req.user.id) {
            return next(new AuthorizationError('You do not have access to this payment'));
        }

        res.status(200).json({
            success: true,
            data: { payment }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Download invoice
// @route   GET /api/payments/invoice/:id
// @access  Private (Client/Admin)
export const downloadInvoice = async (req, res, next) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return next(new NotFoundError('Payment not found'));
        }

        // If user is client, ensure they own this payment
        if (req.user.role === 'client' && payment.client.toString() !== req.user.id) {
            return next(new AuthorizationError('You do not have access to this invoice'));
        }

        if (!payment.invoice || !payment.invoice.invoicePath) {
            return next(new NotFoundError('Invoice not found'));
        }

        // Send file
        res.download(payment.invoice.invoicePath, `invoice-${payment.orderId}.pdf`);
    } catch (error) {
        next(error);
    }
};

export default {
    createPaymentOrder,
    verifyPayment,
    getPaymentHistory,
    getPaymentById,
    downloadInvoice
};
