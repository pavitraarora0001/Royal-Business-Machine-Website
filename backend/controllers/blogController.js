import Blog from '../models/Blog.js';
import ActivityLog from '../models/ActivityLog.js';
import { paginate, getPaginationMeta } from '../utils/helpers.js';
import { NotFoundError } from '../middleware/errorHandler.js';

// @desc    Get all published blogs (Public)
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit);
        const { category, search, status, tag } = req.query;

        const query = {};

        // If not authenticated admin, only show published
        if (!req.user || !['admin', 'super_admin', 'editor'].includes(req.user.role)) {
            query.status = 'published';
        } else if (status) {
            query.status = status;
        }

        if (category) query.category = category;
        if (tag) query.tags = tag;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .sort({ publishedAt: -1, createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Blog.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit);

        res.status(200).json({
            success: true,
            data: { blogs },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return next(new NotFoundError('Article not found'));
        }

        // Increment view count
        blog.views += 1;
        await blog.save();

        res.status(200).json({
            success: true,
            data: { blog }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create blog article
// @route   POST /api/blogs
// @access  Private (Admin / Editor)
export const createBlog = async (req, res, next) => {
    try {
        const blogData = {
            ...req.body,
            authorId: req.user?._id,
            author: req.body.author || req.user?.name || 'Pavitra Arora'
        };

        if (blogData.status === 'published' && !blogData.publishedAt) {
            blogData.publishedAt = new Date();
        }

        const blog = await Blog.create(blogData);

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'CREATE_BLOG',
            module: 'Blog & News',
            targetId: blog._id.toString(),
            targetName: blog.title,
            ipAddress: req.ip
        });

        res.status(201).json({
            success: true,
            message: 'Blog article created successfully',
            data: { blog }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update blog article
// @route   PUT /api/blogs/:id
// @access  Private (Admin / Editor)
export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return next(new NotFoundError('Blog article not found'));
        }

        Object.assign(blog, req.body);
        if (req.body.status === 'published' && !blog.publishedAt) {
            blog.publishedAt = new Date();
        }

        await blog.save();

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'UPDATE_BLOG',
            module: 'Blog & News',
            targetId: blog._id.toString(),
            targetName: blog.title,
            ipAddress: req.ip
        });

        res.status(200).json({
            success: true,
            message: 'Blog article updated successfully',
            data: { blog }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete blog article
// @route   DELETE /api/blogs/:id
// @access  Private (Admin / Editor)
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return next(new NotFoundError('Blog article not found'));
        }

        const title = blog.title;
        await blog.deleteOne();

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'DELETE_BLOG',
            module: 'Blog & News',
            targetId: req.params.id,
            targetName: title,
            ipAddress: req.ip
        });

        res.status(200).json({
            success: true,
            message: 'Blog article deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
