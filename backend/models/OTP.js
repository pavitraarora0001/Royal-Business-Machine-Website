import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ['registration', 'password-reset', 'email-verification'],
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // TTL index - MongoDB will auto-delete expired documents
    }
}, {
    timestamps: true
});

// Indexes
otpSchema.index({ email: 1, purpose: 1 });
otpSchema.index({ expiresAt: 1 });

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
