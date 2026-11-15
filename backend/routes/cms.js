import express from 'express';
import {
    getPageContent,
    getAllPages,
    updatePageContent,
    publishPage
} from '../controllers/cmsController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Public route to fetch live page CMS content
router.get('/pages/:slug', getPageContent);

// Protected routes (Admin, Super Admin, Editor)
router.use(protect);
router.use(restrictTo('admin', 'super_admin', 'editor'));

router.get('/pages', getAllPages);
router.put('/pages/:slug', updatePageContent);
router.post('/pages/:slug/publish', publishPage);

export default router;
