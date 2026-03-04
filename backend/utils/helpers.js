// Generate slug from string
export const generateSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Format date to readable string
export const formatDate = (date, format = 'full') => {
    const d = new Date(date);

    if (format === 'full') {
        return d.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } else if (format === 'date') {
        return d.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } else if (format === 'short') {
        return d.toLocaleDateString('en-IN');
    }

    return d.toISOString();
};

// Paginate results
export const paginate = (page = 1, limit = 10) => {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    return {
        page: pageNum,
        limit: limitNum,
        skip
    };
};

// Calculate pagination metadata
export const getPaginationMeta = (total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPrevPage
    };
};

// Sanitize user input
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .trim()
        .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
        .replace(/<[^>]+>/g, ''); // Remove HTML tags
};

// Generate random string
export const generateRandomString = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Check if email is valid
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Check if phone is valid (Indian format)
export const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

// Format currency (Indian Rupees)
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
};

// Calculate time ago
export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return Math.floor(seconds) + ' seconds ago';
};

// Get client IP address
export const getClientIP = (req) => {
    return req.headers['x-forwarded-for']?.split(',')[0] ||
        req.headers['x-real-ip'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.ip;
};

export default {
    generateSlug,
    formatDate,
    paginate,
    getPaginationMeta,
    sanitizeInput,
    generateRandomString,
    isValidEmail,
    isValidPhone,
    formatCurrency,
    timeAgo,
    getClientIP
};
