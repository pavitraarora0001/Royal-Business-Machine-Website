import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    tagline: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['AVAILABLE', 'IN DEVELOPMENT', 'PLANNED'],
        default: 'AVAILABLE'
    },
    pricingStatus: {
        type: String,
        default: 'Turnkey Contract'
    },
    demoAvailable: {
        type: Boolean,
        default: true
    },
    features: [{
        type: String,
        trim: true
    }],
    keyBenefits: [{
        type: String,
        trim: true
    }],
    technologies: [{
        type: String,
        trim: true
    }],
    idealFor: [{
        type: String,
        trim: true
    }],
    iconName: {
        type: String,
        default: 'Cpu'
    },
    caseStudySlug: {
        type: String,
        default: null
    },
    verifiedClient: {
        type: String,
        default: null
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

// Auto-generate slug before saving
productSchema.pre('save', function (next) {
    if (!this.slug && this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
