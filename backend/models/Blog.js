import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    excerpt: {
        type: String,
        trim: true,
        maxlength: 300
    },
    content: {
        type: String,
        required: [true, 'Blog content is required']
    },
    coverImage: {
        type: String,
        default: null
    },
    category: {
        type: String,
        trim: true,
        default: 'Technology'
    },
    tags: [{
        type: String,
        trim: true
    }],
    author: {
        type: String,
        trim: true,
        default: 'Pavitra Arora'
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'scheduled', 'archived'],
        default: 'draft'
    },
    publishedAt: {
        type: Date,
        default: null
    },
    scheduledFor: {
        type: Date,
        default: null
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    seoTitle: {
        type: String,
        trim: true
    },
    seoDescription: {
        type: String,
        trim: true
    },
    canonicalUrl: {
        type: String,
        trim: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes
blogSchema.index({ status: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ publishedAt: -1 });

// Slug generation hook
blogSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
