import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    userName: {
        type: String,
        trim: true,
        default: 'System / Admin'
    },
    userRole: {
        type: String,
        trim: true,
        default: 'admin'
    },
    action: {
        type: String,
        required: [true, 'Action is required'],
        trim: true
    },
    module: {
        type: String,
        required: [true, 'Module is required'],
        trim: true
    },
    targetId: {
        type: String,
        trim: true
    },
    targetName: {
        type: String,
        trim: true
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ipAddress: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

activityLogSchema.index({ module: 1 });
activityLogSchema.index({ action: 1 });
activityLogSchema.index({ createdAt: -1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
