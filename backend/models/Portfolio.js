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
        maxlength: 250
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
    categories: [{
        type: String,
        trim: true
    }],
    contractValue: {
        type: String,
        trim: true
    },
    requirements: {
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
    outcome: {
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
    coverImage: {
        type: String,
        trim: true
    },
    thumbnailImage: {
        type: String,
        trim: true
    },
    images: [{
        type: String
    }],
    gallery: [{
        type: String
    }],
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

// Indexes (Note: slug already has unique: true)
portfolioSchema.index({ isActive: 1 });
portfolioSchema.index({ isFeatured: 1 });
portfolioSchema.index({ category: 1 });
portfolioSchema.index({ categories: 1 });
portfolioSchema.index({ order: 1 });

// Generate slug from title before saving
portfolioSchema.pre('save', function (next) {
    if (this.isModified('title') || !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Sync category & categories
    if (Array.isArray(this.categories) && this.categories.length > 0) {
        if (!this.category) {
            this.category = this.categories[0];
        }
    } else if (this.category) {
        this.categories = [this.category];
    }

    // Sync outcome and results
    if (this.outcome && !this.results) {
        this.results = this.outcome;
    } else if (this.results && !this.outcome) {
        this.outcome = this.results;
    }

    // Set thumbnail/cover image to first image if not set
    if (this.images && this.images.length > 0) {
        if (!this.thumbnailImage) this.thumbnailImage = this.images[0];
        if (!this.coverImage) this.coverImage = this.images[0];
    } else if (this.coverImage && !this.thumbnailImage) {
        this.thumbnailImage = this.coverImage;
    }

    next();
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
