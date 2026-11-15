import PageContent from '../models/PageContent.js';
import ActivityLog from '../models/ActivityLog.js';
import { NotFoundError } from '../middleware/errorHandler.js';

// @desc    Get page content by slug
// @route   GET /api/cms/pages/:slug
// @access  Public
export const getPageContent = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const page = await PageContent.findOne({ pageSlug: slug.toLowerCase() });

        if (!page) {
            return next(new NotFoundError(`Content for page '${slug}' not found`));
        }

        res.status(200).json({
            success: true,
            data: { page }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all managed pages
// @route   GET /api/cms/pages
// @access  Private (Admin / Editor)
export const getAllPages = async (req, res, next) => {
    try {
        const pages = await PageContent.find().sort({ pageSlug: 1 });

        res.status(200).json({
            success: true,
            data: { pages, count: pages.length }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update page content or sections
// @route   PUT /api/cms/pages/:slug
// @access  Private (Admin / Editor)
export const updatePageContent = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { title, subtitle, sections, seoTitle, seoDescription, canonicalUrl, ogImage, isPublished, isNoIndex } = req.body;

        let page = await PageContent.findOne({ pageSlug: slug.toLowerCase() });

        if (!page) {
            page = new PageContent({
                pageSlug: slug.toLowerCase(),
                title: title || slug.toUpperCase(),
                subtitle: subtitle || '',
                sections: sections || []
            });
        } else {
            if (title !== undefined) page.title = title;
            if (subtitle !== undefined) page.subtitle = subtitle;
            if (sections !== undefined) page.sections = sections;
            if (seoTitle !== undefined) page.seoTitle = seoTitle;
            if (seoDescription !== undefined) page.seoDescription = seoDescription;
            if (canonicalUrl !== undefined) page.canonicalUrl = canonicalUrl;
            if (ogImage !== undefined) page.ogImage = ogImage;
            if (isPublished !== undefined) page.isPublished = isPublished;
            if (isNoIndex !== undefined) page.isNoIndex = isNoIndex;
            page.version += 1;
        }

        if (req.user) {
            page.lastUpdatedBy = req.user._id;
        }

        await page.save();

        // Log administrative action
        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Administrator',
            userRole: req.user?.role || 'admin',
            action: 'UPDATE_PAGE_CMS',
            module: 'Website CMS',
            targetId: page._id.toString(),
            targetName: page.pageSlug,
            details: { title: page.title, sectionCount: page.sections.length },
            ipAddress: req.ip
        });

        res.status(200).json({
            success: true,
            message: `Page '${slug}' content updated successfully`,
            data: { page }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Publish page draft
// @route   POST /api/cms/pages/:slug/publish
// @access  Private (Admin / Editor)
export const publishPage = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const page = await PageContent.findOne({ pageSlug: slug.toLowerCase() });

        if (!page) {
            return next(new NotFoundError(`Page '${slug}' not found`));
        }

        page.isPublished = true;
        page.version += 1;
        if (req.user) page.lastUpdatedBy = req.user._id;
        await page.save();

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Administrator',
            userRole: req.user?.role || 'admin',
            action: 'PUBLISH_PAGE',
            module: 'Website CMS',
            targetId: page._id.toString(),
            targetName: page.pageSlug,
            ipAddress: req.ip
        });

        res.status(200).json({
            success: true,
            message: `Page '${slug}' published to live website`,
            data: { page }
        });
    } catch (error) {
        next(error);
    }
};
