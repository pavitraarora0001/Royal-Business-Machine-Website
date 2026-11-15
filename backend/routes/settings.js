import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Public route to fetch website settings
router.get('/', getSettings);

// Protected route to update website settings (Admin & Super Admin)
router.put('/', protect, restrictTo('admin', 'super_admin'), updateSettings);

export default router;
