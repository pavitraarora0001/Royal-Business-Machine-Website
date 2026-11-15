import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: [true, 'Filename is required'],
        trim: true
    },
    originalName: {
        type: String,
        required: [true, 'Original name is required'],
        trim: true
    },
    mimeType: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: [true, 'Media URL is required'],
        trim: true
    },
    altText: {
        type: String,
        trim: true,
        default: ''
    },
    caption: {
        type: String,
        trim: true,
        default: ''
    },
    folder: {
        type: String,
        trim: true,
        default: 'general'
    },
    dimensions: {
        width: Number,
        height: Number
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

mediaSchema.index({ folder: 1 });
mediaSchema.index({ mimeType: 1 });
mediaSchema.index({ createdAt: -1 });

const Media = mongoose.model('Media', mediaSchema);

export default Media;
