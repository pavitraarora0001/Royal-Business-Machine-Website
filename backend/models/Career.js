import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    location: {
        type: String,
        default: 'Bharatpur HQ / Hybrid',
        trim: true
    },
    type: {
        type: String,
        default: 'Full-Time',
        trim: true
    },
    experience: {
        type: String,
        default: '2+ Years',
        trim: true
    },
    desc: {
        type: String,
        required: [true, 'Job description is required'],
        trim: true
    },
    requirements: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

careerSchema.index({ isActive: 1 });
careerSchema.index({ order: 1 });

const Career = mongoose.model('Career', careerSchema);

export default Career;
