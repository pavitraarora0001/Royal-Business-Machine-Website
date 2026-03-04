import Portfolio from '../models/Portfolio.js';
import { paginate, getPaginationMeta } from '../utils/helpers.js';
import { NotFoundError } from '../middleware/errorHandler.js';
import { deleteFile } from '../config/multer.js';

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
export const getAllPortfolio = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit);
        const { category, isFeatured, isActive } = req.query;

        // Build query
        const query = {};
        if (category) query.category = category;
        if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';
        if (isActive !== undefined) query.isActive = isActive === 'true';
        else query.isActive = true; // Default: only show active items

        // Get portfolio items with pagination
        const [portfolioItems, total] = await Promise.all([
            Portfolio.find(query)
                .sort({ isFeatured: -1, order: 1, createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Portfolio.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit);

        res.status(200).json({
            success: true,
            data: { portfolioItems },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get portfolio item by slug
// @route   GET /api/portfolio/:slug
// @access  Public
export const getPortfolioBySlug = async (req, res, next) => {
    try {
        const portfolioItem = await Portfolio.findOne({ slug: req.params.slug });

        if (!portfolioItem) {
            return next(new NotFoundError('Portfolio item not found'));
        }

        // Increment view count
        portfolioItem.metadata.views += 1;
        await portfolioItem.save();

        res.status(200).json({
            success: true,
            data: { portfolioItem }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create portfolio item
// @route   POST /api/portfolio
// @access  Private (Admin only)
export const createPortfolio = async (req, res, next) => {
    try {
        const {
            title,
            description,
            shortDescription,
            client,
            category,
            technologies,
            projectUrl,
            completionDate,
            duration,
            teamSize,
            isFeatured,
            order
        } = req.body;

        // Handle multiple image uploads
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `/uploads/portfolio/${file.filename}`);
        }

        const portfolioItem = await Portfolio.create({
            title,
            description,
            shortDescription,
            client,
            category,
            technologies: technologies ? JSON.parse(technologies) : [],
            images: imageUrls,
            projectUrl,
            completionDate,
            duration,
            teamSize,
            isFeatured: isFeatured === 'true',
            order: order || 0,
            isActive: true
        });

        res.status(201).json({
            success: true,
            message: 'Portfolio item created successfully',
            data: { portfolioItem }
        });
    } catch (error) {
        // Delete uploaded files if creation fails
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => deleteFile(file.path));
        }
        next(error);
    }
};

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private (Admin only)
export const updatePortfolio = async (req, res, next) => {
    try {
        const portfolioItem = await Portfolio.findById(req.params.id);
        if (!portfolioItem) {
            return next(new NotFoundError('Portfolio item not found'));
        }

        const {
            title,
            description,
            shortDescription,
            client,
            category,
            technologies,
            projectUrl,
            completionDate,
            duration,
            teamSize,
            isFeatured,
            order,
            isActive
        } = req.body;

        // Update fields
        if (title) portfolioItem.title = title;
        if (description) portfolioItem.description = description;
        if (shortDescription) portfolioItem.shortDescription = shortDescription;
        if (client) portfolioItem.client = client;
        if (category) portfolioItem.category = category;
        if (technologies) portfolioItem.technologies = JSON.parse(technologies);
        if (projectUrl) portfolioItem.projectUrl = projectUrl;
        if (completionDate) portfolioItem.completionDate = completionDate;
        if (duration) portfolioItem.duration = duration;
        if (teamSize) portfolioItem.teamSize = teamSize;
        if (isFeatured !== undefined) portfolioItem.isFeatured = isFeatured === 'true';
        if (order !== undefined) portfolioItem.order = order;
        if (isActive !== undefined) portfolioItem.isActive = isActive === 'true';

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            // Delete old images
            if (portfolioItem.images && portfolioItem.images.length > 0) {
                portfolioItem.images.forEach(image => {
                    const imagePath = `.${image}`;
                    deleteFile(imagePath);
                });
            }
            portfolioItem.images = req.files.map(file => `/uploads/portfolio/${file.filename}`);
        }

        await portfolioItem.save();

        res.status(200).json({
            success: true,
            message: 'Portfolio item updated successfully',
            data: { portfolioItem }
        });
    } catch (error) {
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => deleteFile(file.path));
        }
        next(error);
    }
};

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private (Admin only)
export const deletePortfolio = async (req, res, next) => {
    try {
        const portfolioItem = await Portfolio.findById(req.params.id);
        if (!portfolioItem) {
            return next(new NotFoundError('Portfolio item not found'));
        }

        // Delete associated images
        if (portfolioItem.images && portfolioItem.images.length > 0) {
            portfolioItem.images.forEach(image => {
                const imagePath = `.${image}`;
                deleteFile(imagePath);
            });
        }

        await portfolioItem.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Portfolio item deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllPortfolio,
    getPortfolioBySlug,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
};
