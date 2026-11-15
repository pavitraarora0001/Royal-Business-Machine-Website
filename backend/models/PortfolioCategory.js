import mongoose from 'mongoose';

const portfolioCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
    shortLabel: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Category slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    subdisciplines: [{
        type: String,
        trim: true
    }],
    icon: {
        type: String,
        default: 'Folder'
    },
    imageUrl: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

portfolioCategorySchema.index({ isActive: 1 });
portfolioCategorySchema.index({ order: 1 });

const PortfolioCategory = mongoose.model('PortfolioCategory', portfolioCategorySchema);

export default PortfolioCategory;
