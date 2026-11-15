import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Portfolio title is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Portfolio description is required'],
        trim: true
    },
    shortDescription: {
        type: String,
        trim: true,
        maxlength: 200
    },
    client: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    contractValue: {
        type: String,
        trim: true
    },
    challenge: {
        type: String,
        trim: true
    },
    solution: {
        type: String,
        trim: true
    },
    results: {
        type: String,
        trim: true
    },
    seoTitle: {
        type: String,
        trim: true
    },
    seoDescription: {
        type: String,
        trim: true
    },
    technologies: [{
        type: String,
        trim: true
    }],
    images: [{
        type: String
    }],
    thumbnailImage: {
        type: String
    },
    projectUrl: {
        type: String,
        trim: true
    },
    completionDate: {
        type: Date
    },
    duration: {
        type: String,
        trim: true
    },
    teamSize: {
        type: Number,
        min: 1
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
    metadata: {
        views: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Indexes
portfolioSchema.index({ slug: 1 });
portfolioSchema.index({ isActive: 1 });
portfolioSchema.index({ isFeatured: 1 });
portfolioSchema.index({ category: 1 });
portfolioSchema.index({ order: 1 });

// Generate slug from title before saving
portfolioSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Set thumbnail to first image if not set
    if (this.images && this.images.length > 0 && !this.thumbnailImage) {
        this.thumbnailImage = this.images[0];
    }

    next();
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
