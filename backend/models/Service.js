import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Service title is required'],
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
        trim: true
    },
    shortDescription: {
        type: String,
        trim: true,
        maxlength: 200
    },
    features: [{
        type: String,
        trim: true
    }],
    benefits: [{
        type: String,
        trim: true
    }],
    technologies: [{
        type: String,
        trim: true
    }],
    image: {
        type: String,
        default: null
    },
    galleryImages: [{
        type: String
    }],
    icon: {
        type: String,
        default: null
    },
    category: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    priceType: {
        type: String,
        enum: ['fixed', 'hourly', 'project', 'custom'],
        default: 'custom'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    seoTitle: {
        type: String,
        trim: true
    },
    seoDescription: {
        type: String,
        trim: true
    },
    metadata: {
        views: {
            type: Number,
            default: 0
        },
        inquiries: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Indexes
serviceSchema.index({ slug: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ order: 1 });

// Generate slug from title before saving
serviceSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
