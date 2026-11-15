import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: 'Royal Business Machine',
        trim: true
    },
    tagline: {
        type: String,
        default: 'Enterprise Technology, Software Architecture & High-Concurrency Systems',
        trim: true
    },
    logoUrl: {
        type: String,
        default: '/assets/logo/logo-horizontal.png'
    },
    logoStackedUrl: {
        type: String,
        default: '/assets/logo/logo-stacked.png'
    },
    faviconUrl: {
        type: String,
        default: '/icon.png'
    },
    primaryPhone: {
        type: String,
        default: '+91 9057287689',
        trim: true
    },
    secondaryPhone: {
        type: String,
        default: '+91 7727887850',
        trim: true
    },
    whatsappNumber: {
        type: String,
        default: '+91 9057287689',
        trim: true
    },
    primaryEmail: {
        type: String,
        default: 'royalbusinessmachine@gmail.com',
        trim: true
    },
    secondaryEmail: {
        type: String,
        default: 'contact@royalbusiness.com',
        trim: true
    },
    address: {
        headquarters: {
            type: String,
            default: 'Bharatpur, Rajasthan, India'
        },
        regionalCenters: {
            type: String,
            default: 'Bharatpur, Karauli, Alwar, Dholpur, Jaipur & National Deployments'
        }
    },
    businessHours: {
        type: String,
        default: 'Monday – Saturday: 09:00 AM – 07:00 PM IST (24/7 Monitoring for Active Enterprise Server Deployments)'
    },
    socialLinks: {
        linkedin: { type: String, default: 'https://www.linkedin.com/company/royal-business-machine' },
        twitter: { type: String, default: 'https://twitter.com/royalbizmachine' },
        github: { type: String, default: 'https://github.com/pavitraarora0001' },
        instagram: { type: String, default: '#' },
        facebook: { type: String, default: '#' }
    },
    footerContent: {
        copyrightNotice: { type: String, default: '© 2018–2026 ROYAL BUSINESS MACHINE. All Rights Reserved.' },
        disclaimer: { type: String, default: 'Turnkey Enterprise Execution Partner across software, cloud, and physical infrastructure.' }
    },
    headerNavigation: [{
        label: { type: String, required: true },
        href: { type: String, required: true },
        order: { type: Number, default: 0 },
        isVisible: { type: Boolean, default: true }
    }],
    footerNavigation: [{
        group: { type: String, default: 'Quick Links' },
        label: { type: String, required: true },
        href: { type: String, required: true },
        order: { type: Number, default: 0 },
        isVisible: { type: Boolean, default: true }
    }],
    isMaintenanceMode: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
