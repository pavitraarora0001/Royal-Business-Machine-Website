import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_KEY_ID !== 'your-razorpay-key-id') {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
} else {
    console.warn('⚠️ Razorpay credentials missing or default. Payment features will be disabled.');
}

// Create Razorpay Order
export const createOrder = async (amount, currency = 'INR', receipt, notes = {}) => {
    try {
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt,
            notes
        };

        if (!razorpay) {
            throw new Error('Razorpay is not configured');
        }

        const order = await razorpay.orders.create(options);
        console.log('✅ Razorpay order created:', order.id);

        return {
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt
            }
        };
    } catch (error) {
        console.error('❌ Error creating Razorpay order:', error);
        throw new Error('Failed to create payment order');
    }
};

// Verify Payment Signature
export const verifyPaymentSignature = (orderId, paymentId, signature) => {
    try {
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        const isValid = generatedSignature === signature;

        if (isValid) {
            console.log('✅ Payment signature verified');
        } else {
            console.log('❌ Payment signature verification failed');
        }

        return isValid;
    } catch (error) {
        console.error('❌ Error verifying payment signature:', error);
        return false;
    }
};

// Fetch Payment Details
export const fetchPayment = async (paymentId) => {
    try {
        if (!razorpay) {
            throw new Error('Razorpay is not configured');
        }
        const payment = await razorpay.payments.fetch(paymentId);
        console.log('✅ Payment details fetched:', paymentId);
        return {
            success: true,
            payment
        };
    } catch (error) {
        console.error('❌ Error fetching payment:', error);
        throw new Error('Failed to fetch payment details');
    }
};

// Fetch Order Details
export const fetchOrder = async (orderId) => {
    try {
        if (!razorpay) {
            throw new Error('Razorpay is not configured');
        }
        const order = await razorpay.orders.fetch(orderId);
        console.log('✅ Order details fetched:', orderId);
        return {
            success: true,
            order
        };
    } catch (error) {
        console.error('❌ Error fetching order:', error);
        throw new Error('Failed to fetch order details');
    }
};

// Create Refund
export const createRefund = async (paymentId, amount = null, notes = {}) => {
    try {
        const options = {
            notes
        };

        // If amount is specified, it's a partial refund
        if (amount) {
            options.amount = amount * 100; // Amount in paise
        }

        if (!razorpay) {
            throw new Error('Razorpay is not configured');
        }
        const refund = await razorpay.payments.refund(paymentId, options);
        console.log('✅ Refund created:', refund.id);

        return {
            success: true,
            refund: {
                id: refund.id,
                amount: refund.amount,
                status: refund.status
            }
        };
    } catch (error) {
        console.error('❌ Error creating refund:', error);
        throw new Error('Failed to create refund');
    }
};

// Fetch Refund Details
export const fetchRefund = async (refundId) => {
    try {
        if (!razorpay) {
            throw new Error('Razorpay is not configured');
        }
        const refund = await razorpay.refunds.fetch(refundId);
        console.log('✅ Refund details fetched:', refundId);
        return {
            success: true,
            refund
        };
    } catch (error) {
        console.error('❌ Error fetching refund:', error);
        throw new Error('Failed to fetch refund details');
    }
};

// Verify Webhook Signature (for webhook events)
export const verifyWebhookSignature = (body, signature, secret) => {
    try {
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(body))
            .digest('hex');

        return expectedSignature === signature;
    } catch (error) {
        console.error('❌ Error verifying webhook signature:', error);
        return false;
    }
};

export default {
    createOrder,
    verifyPaymentSignature,
    fetchPayment,
    fetchOrder,
    createRefund,
    fetchRefund,
    verifyWebhookSignature
};
