import path from 'path';
import fs from 'fs';
import Media from '../models/Media.js';
import ActivityLog from '../models/ActivityLog.js';
import { paginate, getPaginationMeta } from '../utils/helpers.js';
import { NotFoundError } from '../middleware/errorHandler.js';

// @desc    Get all media assets
// @route   GET /api/media
// @access  Private (Admin / Editor / Sales)
export const getAllMedia = async (req, res, next) => {
    try {
        const { page, limit, skip } = paginate(req.query.page, req.query.limit || 24);
        const { folder, type, search } = req.query;

        const query = {};
        if (folder && folder !== 'all') query.folder = folder;

        if (type) {
            if (type === 'image') query.mimeType = { $regex: '^image/', $options: 'i' };
            else if (type === 'video') query.mimeType = { $regex: '^video/', $options: 'i' };
            else if (type === 'document') query.mimeType = { $regex: 'pdf', $options: 'i' };
        }

        if (search) {
            query.$or = [
                { filename: { $regex: search, $options: 'i' } },
                { originalName: { $regex: search, $options: 'i' } },
                { altText: { $regex: search, $options: 'i' } },
                { caption: { $regex: search, $options: 'i' } }
            ];
        }

        const [media, total] = await Promise.all([
            Media.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Media.countDocuments(query)
        ]);

        const pagination = getPaginationMeta(total, page, limit || 24);

        // Also get distinct folders
        const folders = await Media.distinct('folder');

        res.status(200).json({
            success: true,
            data: { media, folders },
            pagination
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Upload media files
// @route   POST /api/media/upload
// @access  Private (Admin / Editor)
export const uploadMedia = async (req, res, next) => {
    try {
        if (!req.file && (!req.files || req.files.length === 0)) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const uploadedFiles = req.files || [req.file];
        const folder = req.body.folder || 'general';
        const createdMedia = [];

        for (const file of uploadedFiles) {
            const relativeUrl = `/uploads/${file.filename}`;
            const mediaDoc = await Media.create({
                filename: file.filename,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                url: relativeUrl,
                altText: req.body.altText || file.originalname,
                caption: req.body.caption || '',
                folder,
                uploadedBy: req.user?._id
            });
            createdMedia.push(mediaDoc);
        }

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'UPLOAD_MEDIA',
            module: 'Media Library',
            details: { count: createdMedia.length, folder },
            ipAddress: req.ip
        });

        res.status(201).json({
            success: true,
            message: `${createdMedia.length} media asset(s) uploaded successfully`,
            data: { media: createdMedia }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update media metadata
// @route   PATCH /api/media/:id
// @access  Private (Admin / Editor)
export const updateMedia = async (req, res, next) => {
    try {
        const media = await Media.findById(req.params.id);

        if (!media) {
            return next(new NotFoundError('Media asset not found'));
        }

        const { altText, caption, folder, filename } = req.body;
        if (altText !== undefined) media.altText = altText;
        if (caption !== undefined) media.caption = caption;
        if (folder !== undefined) media.folder = folder;
        if (filename !== undefined) media.filename = filename;

        await media.save();

        res.status(200).json({
            success: true,
            message: 'Media details updated',
            data: { media }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete media asset
// @route   DELETE /api/media/:id
// @access  Private (Admin / Super Admin)
export const deleteMedia = async (req, res, next) => {
    try {
        const media = await Media.findById(req.params.id);

        if (!media) {
            return next(new NotFoundError('Media asset not found'));
        }

        // Delete physical file safely
        const uploadDir = process.env.UPLOAD_PATH || './uploads';
        const filePath = path.join(uploadDir, media.filename);
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                console.warn('Physical file delete warning:', err.message);
            }
        }

        const filename = media.filename;
        await media.deleteOne();

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'DELETE_MEDIA',
            module: 'Media Library',
            targetId: req.params.id,
            targetName: filename,
            ipAddress: req.ip
        });

        res.status(200).json({
            success: true,
            message: 'Media asset deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
