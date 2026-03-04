import Service from '../models/Service.js';
import { paginate, getPaginationMeta } from '../utils/helpers.js';
import { NotFoundError } from '../middleware/errorHandler.js';
import { deleteFile } from '../config/multer.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit);
        const { category, isActive } = req.query;

        // Build query
        const query = {};
        if (category) query.category = category;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        else query.isActive = true; // Default: only show active services

        // Get services with pagination
        const [services, total] = await Promise.all([
            Service.find(query)
                .sort({ order: 1, createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Service.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit);

        res.status(200).json({
            success: true,
            data: { services },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get service by slug
// @route   GET /api/services/:slug
// @access  Public
export const getServiceBySlug = async (req, res, next) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });

        if (!service) {
            return next(new NotFoundError('Service not found'));
        }

        // Increment view count
        service.metadata.views += 1;
        await service.save();

        res.status(200).json({
            success: true,
            data: { service }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private (Admin only)
export const createService = async (req, res, next) => {
    try {
        const { title, description, shortDescription, features, category, price, priceType, icon, order } = req.body;

        // Handle image upload
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/services/${req.file.filename}`;
        }

        const service = await Service.create({
            title,
            description,
            shortDescription,
            features: features ? JSON.parse(features) : [],
            category,
            price,
            priceType,
            icon,
            image: imageUrl,
            order: order || 0,
            isActive: true
        });

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: { service }
        });
    } catch (error) {
        // Delete uploaded file if service creation fails
        if (req.file) {
            deleteFile(req.file.path);
        }
        next(error);
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin only)
export const updateService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return next(new NotFoundError('Service not found'));
        }

        const { title, description, shortDescription, features, category, price, priceType, icon, order, isActive } = req.body;

        // Update fields
        if (title) service.title = title;
        if (description) service.description = description;
        if (shortDescription) service.shortDescription = shortDescription;
        if (features) service.features = JSON.parse(features);
        if (category) service.category = category;
        if (price !== undefined) service.price = price;
        if (priceType) service.priceType = priceType;
        if (icon) service.icon = icon;
        if (order !== undefined) service.order = order;
        if (isActive !== undefined) service.isActive = isActive;

        // Handle new image upload
        if (req.file) {
            // Delete old image
            if (service.image) {
                const oldImagePath = `.${service.image}`;
                deleteFile(oldImagePath);
            }
            service.image = `/uploads/services/${req.file.filename}`;
        }

        await service.save();

        res.status(200).json({
            success: true,
            message: 'Service updated successfully',
            data: { service }
        });
    } catch (error) {
        if (req.file) {
            deleteFile(req.file.path);
        }
        next(error);
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin only)
export const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return next(new NotFoundError('Service not found'));
        }

        // Delete associated image
        if (service.image) {
            const imagePath = `.${service.image}`;
            deleteFile(imagePath);
        }

        await service.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllServices,
    getServiceBySlug,
    createService,
    updateService,
    deleteService
};
