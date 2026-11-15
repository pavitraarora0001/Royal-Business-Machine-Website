import mongoose from 'mongoose';

const clientTestimonialSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    logo: {
        type: String,
        default: null
    },
    clientImage: {
        type: String,
        default: null
    },
    website: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        trim: true
    },
    testimonial: {
        type: String,
        required: [true, 'Testimonial text is required'],
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    verifiedProject: {
        type: String,
        trim: true
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

clientTestimonialSchema.index({ isActive: 1 });
clientTestimonialSchema.index({ isFeatured: 1 });
clientTestimonialSchema.index({ order: 1 });

const ClientTestimonial = mongoose.model('ClientTestimonial', clientTestimonialSchema);

export default ClientTestimonial;
