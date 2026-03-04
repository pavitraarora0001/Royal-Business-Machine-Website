import OTP from '../models/OTP.js';
import { sendOTPEmail } from './emailService.js';

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create and send OTP
export const createAndSendOTP = async (email, purpose) => {
    try {
        // Delete any existing OTPs for this email and purpose
        await OTP.deleteMany({ email, purpose, isUsed: false });

        // Generate new OTP
        const otpCode = generateOTP();

        // Calculate expiry time
        const expiryMinutes = parseInt(process.env.OTP_EXPIRE || 5);
        const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

        // Save OTP to database
        const otp = await OTP.create({
            email,
            otp: otpCode,
            purpose,
            expiresAt
        });

        // Send OTP via email
        await sendOTPEmail(email, otpCode, purpose);

        console.log(`✅ OTP created and sent to ${email} for ${purpose}`);
        return {
            success: true,
            message: 'OTP sent successfully',
            expiresIn: expiryMinutes
        };
    } catch (error) {
        console.error('❌ Error creating/sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};

// Verify OTP
export const verifyOTP = async (email, otpCode, purpose) => {
    try {
        // Find valid OTP
        const otp = await OTP.findOne({
            email,
            otp: otpCode,
            purpose,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        });

        if (!otp) {
            return {
                success: false,
                message: 'Invalid or expired OTP'
            };
        }

        // Mark OTP as used
        otp.isUsed = true;
        await otp.save();

        console.log(`✅ OTP verified for ${email}`);
        return {
            success: true,
            message: 'OTP verified successfully'
        };
    } catch (error) {
        console.error('❌ Error verifying OTP:', error);
        throw new Error('Failed to verify OTP');
    }
};

// Check if OTP exists and is valid (without marking as used)
export const checkOTP = async (email, purpose) => {
    try {
        const otp = await OTP.findOne({
            email,
            purpose,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        });

        return {
            exists: !!otp,
            expiresAt: otp?.expiresAt
        };
    } catch (error) {
        console.error('❌ Error checking OTP:', error);
        return { exists: false };
    }
};

// Cleanup expired OTPs (optional - MongoDB TTL index handles this automatically)
export const cleanupExpiredOTPs = async () => {
    try {
        const result = await OTP.deleteMany({
            expiresAt: { $lt: new Date() }
        });
        console.log(`🧹 Cleaned up ${result.deletedCount} expired OTPs`);
        return result.deletedCount;
    } catch (error) {
        console.error('❌ Error cleaning up OTPs:', error);
        return 0;
    }
};

export default {
    createAndSendOTP,
    verifyOTP,
    checkOTP,
    cleanupExpiredOTPs
};
