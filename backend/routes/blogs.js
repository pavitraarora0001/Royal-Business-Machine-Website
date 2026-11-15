import express from 'express';
import {
    getAllBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';
import { protect, restrictTo, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes (with optionalAuth to allow admins to see draft/scheduled)
router.get('/', optionalAuth, getAllBlogs);
router.get('/:slug', getBlogBySlug);

// Protected routes (Admin / Editor)
router.use(protect);
router.use(restrictTo('admin', 'super_admin', 'editor'));

router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
