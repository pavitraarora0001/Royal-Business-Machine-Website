import mongoose from 'mongoose';

const sectionBlockSchema = new mongoose.Schema({
    sectionKey: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    badge: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    mediaUrl: {
        type: String,
        trim: true
    },
    ctaText: {
        type: String,
        trim: true
    },
    ctaLink: {
        type: String,
        trim: true
    },
    secondaryCtaText: {
        type: String,
        trim: true
    },
    secondaryCtaLink: {
        type: String,
        trim: true
    },
    isVisible: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    customData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { _id: true });

const pageContentSchema = new mongoose.Schema({
    pageSlug: {
        type: String,
        required: [true, 'Page slug is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    title: {
        type: String,
        required: [true, 'Page title is required'],
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    sections: [sectionBlockSchema],
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
    ogImage: {
        type: String,
        trim: true
    },
    isNoIndex: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    version: {
        type: Number,
        default: 1
    },
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

pageContentSchema.index({ isPublished: 1 });

const PageContent = mongoose.model('PageContent', pageContentSchema);

export default PageContent;
