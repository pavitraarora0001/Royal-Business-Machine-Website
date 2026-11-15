import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Role/Designation is required'],
        trim: true
    },
    badge: {
        type: String,
        trim: true,
        default: 'Team Member'
    },
    bio: {
        type: String,
        required: [true, 'Bio is required'],
        trim: true
    },
    skills: [{
        type: String,
        trim: true
    }],
    photo: {
        type: String,
        default: null
    },
    socials: {
        linkedin: { type: String, trim: true },
        twitter: { type: String, trim: true },
        github: { type: String, trim: true },
        mail: { type: String, trim: true }
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
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

teamMemberSchema.index({ isActive: 1 });
teamMemberSchema.index({ order: 1 });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
