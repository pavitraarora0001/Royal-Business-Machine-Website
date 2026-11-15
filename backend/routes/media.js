import express from 'express';
import {
    getAllMedia,
    uploadMedia,
    updateMedia,
    deleteMedia
} from '../controllers/mediaController.js';
import { uploadMediaFiles } from '../config/multer.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'super_admin', 'editor', 'sales'));

// GET all media assets
router.get('/', getAllMedia);

// Upload media files (Admin, Super Admin, Editor)
router.post('/upload', restrictTo('admin', 'super_admin', 'editor'), uploadMediaFiles, uploadMedia);

// Update media metadata
router.patch('/:id', restrictTo('admin', 'super_admin', 'editor'), updateMedia);

// Delete media asset
router.delete('/:id', restrictTo('admin', 'super_admin'), deleteMedia);

export default router;
