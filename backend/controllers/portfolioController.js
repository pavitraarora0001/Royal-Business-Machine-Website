import Portfolio from '../models/Portfolio.js';
import PortfolioCategory from '../models/PortfolioCategory.js';
import { paginate, getPaginationMeta } from '../utils/helpers.js';
import { NotFoundError, BadRequestError } from '../middleware/errorHandler.js';
import { deleteFile } from '../config/multer.js';

// Default 5 enterprise categories if DB is clean
const DEFAULT_CATEGORIES = [
    {
        name: 'Application Development',
        shortLabel: 'Applications',
        slug: 'application-development',
        description: 'Mobile apps, Android applications, iOS applications, SaaS, enterprise applications, ERP and CRM.',
        subdisciplines: ['Mobile apps', 'Android & iOS', 'SaaS products', 'Enterprise ERP & CRM', 'Custom software'],
        icon: 'Smartphone',
        order: 1
    },
    {
        name: 'AI & Business Automation',
        shortLabel: 'AI Automation',
        slug: 'ai-business-automation',
        description: 'AI agents, AI chatbots, workflow automation, business automation, intelligent integrations.',
        subdisciplines: ['AI agents', 'AI chatbots', 'Workflow automation', 'Verification engines', 'API integrations'],
        icon: 'Cpu',
        order: 2
    },
    {
        name: 'Digital Marketing',
        shortLabel: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'Social media marketing, Google Ads, Meta Ads, performance marketing, content marketing.',
        subdisciplines: ['Social media campaigns', 'Google & Meta Ads', 'D2C growth funnels', 'Brand lookbooks'],
        icon: 'Megaphone',
        order: 3
    },
    {
        name: 'Web Solutions',
        shortLabel: 'Web Solutions',
        slug: 'web-solutions',
        description: 'Business websites, e-commerce, custom web applications, enterprise portals and website redesign.',
        subdisciplines: ['High-concurrency portals', 'E-commerce storefronts', 'Institutional websites', 'B2B portals'],
        icon: 'Globe',
        order: 4
    },
    {
        name: 'SEO Solutions',
        shortLabel: 'SEO Solutions',
        slug: 'seo-solutions',
        description: 'Technical SEO, local SEO, on-page SEO, off-page SEO, AEO and GEO.',
        subdisciplines: ['Technical SEO', 'Local search domination', 'On-page / Off-page SEO', 'AEO / GEO'],
        icon: 'Search',
        order: 5
    }
];

// @desc    Get all portfolio categories with project counts
// @route   GET /api/portfolio/categories
// @access  Public
export const getAllCategories = async (req, res, next) => {
    try {
        let categories = await PortfolioCategory.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        
        // If DB has no categories seeded, initialize default categories
        if (!categories || categories.length === 0) {
            try {
                categories = await PortfolioCategory.insertMany(DEFAULT_CATEGORIES);
            } catch {
                categories = DEFAULT_CATEGORIES;
            }
        }

        // Aggregate project counts for each category
        const counts = await Promise.all(
            categories.map(async (cat) => {
                const count = await Portfolio.countDocuments({
                    isActive: true,
                    $or: [
                        { category: cat.name },
                        { categories: cat.name },
                        { category: cat.shortLabel },
                        { categories: cat.shortLabel }
                    ]
                });
                return {
                    ...(cat.toObject ? cat.toObject() : cat),
                    projectCount: count
                };
            })
        );

        const totalProjects = await Portfolio.countDocuments({ isActive: true });

        res.status(200).json({
            success: true,
            data: {
                categories: counts,
                totalProjects
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a portfolio category
// @route   POST /api/portfolio/categories
// @access  Private (Admin only)
export const createCategory = async (req, res, next) => {
    try {
        const { name, shortLabel, slug, description, subdisciplines, icon, imageUrl, order } = req.body;
        
        if (!name) {
            return next(new BadRequestError('Category name is required'));
        }

        const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

        const category = await PortfolioCategory.create({
            name,
            shortLabel: shortLabel || name,
            slug: categorySlug,
            description,
            subdisciplines: Array.isArray(subdisciplines) ? subdisciplines : (subdisciplines ? subdisciplines.split(',').map(s => s.trim()) : []),
            icon: icon || 'Folder',
            imageUrl,
            order: order || 0
        });

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: { category }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a portfolio category
// @route   PUT /api/portfolio/categories/:id
// @access  Private (Admin only)
export const updateCategory = async (req, res, next) => {
    try {
        const category = await PortfolioCategory.findById(req.params.id);
        if (!category) {
            return next(new NotFoundError('Category not found'));
        }

        const { name, shortLabel, description, subdisciplines, icon, imageUrl, order, isActive } = req.body;
        if (name) category.name = name;
        if (shortLabel) category.shortLabel = shortLabel;
        if (description) category.description = description;
        if (subdisciplines) category.subdisciplines = Array.isArray(subdisciplines) ? subdisciplines : subdisciplines.split(',').map(s => s.trim());
        if (icon) category.icon = icon;
        if (imageUrl !== undefined) category.imageUrl = imageUrl;
        if (order !== undefined) category.order = order;
        if (isActive !== undefined) category.isActive = isActive;

        await category.save();

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: { category }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a portfolio category
// @route   DELETE /api/portfolio/categories/:id
// @access  Private (Admin only)
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await PortfolioCategory.findById(req.params.id);
        if (!category) {
            return next(new NotFoundError('Category not found'));
        }

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
export const getAllPortfolio = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit);
        const { category, search, isFeatured, isActive } = req.query;

        // Build query
        const query = {};
        
        if (category && category !== 'All' && category !== 'All Projects') {
            query.$or = [
                { category: category },
                { categories: category },
                { category: new RegExp(`^${category}$`, 'i') },
                { categories: new RegExp(`^${category}$`, 'i') }
            ];
        }

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            const searchCondition = [
                { title: searchRegex },
                { client: searchRegex },
                { description: searchRegex },
                { technologies: searchRegex }
            ];
            if (query.$or) {
                query.$and = [
                    { $or: query.$or },
                    { $or: searchCondition }
                ];
                delete query.$or;
            } else {
                query.$or = searchCondition;
            }
        }

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

// @desc    Get portfolio item by slug or id
// @route   GET /api/portfolio/:slug
// @access  Public
export const getPortfolioBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        
        // Find by slug first, fallback to _id
        let portfolioItem = await Portfolio.findOne({ slug });
        if (!portfolioItem && slug.match(/^[0-9a-fA-F]{24}$/)) {
            portfolioItem = await Portfolio.findById(slug);
        }

        if (!portfolioItem) {
            return next(new NotFoundError('Portfolio item not found'));
        }

        // Increment view count asynchronously
        portfolioItem.metadata.views += 1;
        await portfolioItem.save();

        // Fetch related projects in same categories
        const searchCategories = portfolioItem.categories && portfolioItem.categories.length > 0 
            ? portfolioItem.categories 
            : [portfolioItem.category];

        const relatedProjects = await Portfolio.find({
            _id: { $ne: portfolioItem._id },
            isActive: true,
            $or: [
                { category: { $in: searchCategories } },
                { categories: { $in: searchCategories } }
            ]
        })
        .limit(3)
        .select('title slug client category categories contractValue shortDescription outcome technologies coverImage thumbnailImage');

        res.status(200).json({
            success: true,
            data: { 
                portfolioItem,
                relatedProjects
            }
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
            industry,
            category,
            categories,
            contractValue,
            requirements,
            challenge,
            solution,
            outcome,
            results,
            technologies,
            coverImage,
            projectUrl,
            completionDate,
            duration,
            teamSize,
            isFeatured,
            order
        } = req.body;

        // Parse categories
        let parsedCategories = [];
        if (categories) {
            parsedCategories = typeof categories === 'string' ? (categories.startsWith('[') ? JSON.parse(categories) : [categories]) : categories;
        } else if (category) {
            parsedCategories = [category];
        }

        // Handle multiple image uploads
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `/uploads/portfolio/${file.filename}`);
        }

        const portfolioItem = await Portfolio.create({
            title,
            description,
            shortDescription: shortDescription || (description ? description.slice(0, 180) + '...' : ''),
            client,
            industry,
            category: parsedCategories[0] || category || 'Web Solutions',
            categories: parsedCategories,
            contractValue,
            requirements,
            challenge,
            solution,
            outcome: outcome || results,
            results: results || outcome,
            technologies: technologies ? (typeof technologies === 'string' ? JSON.parse(technologies) : technologies) : [],
            coverImage: coverImage || (imageUrls.length > 0 ? imageUrls[0] : ''),
            thumbnailImage: imageUrls.length > 0 ? imageUrls[0] : (coverImage || ''),
            images: imageUrls,
            gallery: imageUrls,
            projectUrl,
            completionDate,
            duration,
            teamSize,
            isFeatured: isFeatured === 'true' || isFeatured === true,
            order: order || 0,
            isActive: true
        });

        res.status(201).json({
            success: true,
            message: 'Portfolio item created successfully',
            data: { portfolioItem }
        });
    } catch (error) {
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
            industry,
            category,
            categories,
            contractValue,
            requirements,
            challenge,
            solution,
            outcome,
            results,
            technologies,
            coverImage,
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
        if (industry) portfolioItem.industry = industry;
        if (categories) {
            portfolioItem.categories = typeof categories === 'string' ? (categories.startsWith('[') ? JSON.parse(categories) : [categories]) : categories;
            portfolioItem.category = portfolioItem.categories[0];
        } else if (category) {
            portfolioItem.category = category;
            portfolioItem.categories = [category];
        }
        if (contractValue !== undefined) portfolioItem.contractValue = contractValue;
        if (requirements !== undefined) portfolioItem.requirements = requirements;
        if (challenge !== undefined) portfolioItem.challenge = challenge;
        if (solution !== undefined) portfolioItem.solution = solution;
        if (outcome !== undefined) {
            portfolioItem.outcome = outcome;
            portfolioItem.results = outcome;
        }
        if (results !== undefined && !outcome) {
            portfolioItem.results = results;
            portfolioItem.outcome = results;
        }
        if (technologies) {
            portfolioItem.technologies = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
        }
        if (coverImage) portfolioItem.coverImage = coverImage;
        if (projectUrl !== undefined) portfolioItem.projectUrl = projectUrl;
        if (completionDate) portfolioItem.completionDate = completionDate;
        if (duration) portfolioItem.duration = duration;
        if (teamSize) portfolioItem.teamSize = teamSize;
        if (isFeatured !== undefined) portfolioItem.isFeatured = isFeatured === 'true' || isFeatured === true;
        if (order !== undefined) portfolioItem.order = order;
        if (isActive !== undefined) portfolioItem.isActive = isActive === 'true' || isActive === true;

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/portfolio/${file.filename}`);
            portfolioItem.images = [...(portfolioItem.images || []), ...newImages];
            portfolioItem.gallery = [...(portfolioItem.gallery || []), ...newImages];
            if (!portfolioItem.coverImage) portfolioItem.coverImage = newImages[0];
            if (!portfolioItem.thumbnailImage) portfolioItem.thumbnailImage = newImages[0];
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

        // Delete associated uploaded images
        if (portfolioItem.images && portfolioItem.images.length > 0) {
            portfolioItem.images.forEach(image => {
                if (image.startsWith('/uploads/')) {
                    deleteFile(`.${image}`);
                }
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
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllPortfolio,
    getPortfolioBySlug,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
};
