import Setting from '../models/Setting.js';
import ActivityLog from '../models/ActivityLog.js';

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
    try {
        let setting = await Setting.findOne();

        if (!setting) {
            setting = await Setting.create({});
        }

        res.status(200).json({
            success: true,
            data: { settings: setting }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin / Super Admin)
export const updateSettings = async (req, res, next) => {
    try {
        let setting = await Setting.findOne();

        if (!setting) {
            setting = new Setting(req.body);
        } else {
            Object.assign(setting, req.body);
        }

        await setting.save();

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'UPDATE_WEBSITE_SETTINGS',
            module: 'Website Settings',
            targetId: setting._id.toString(),
            targetName: setting.companyName,
            ipAddress: req.ip
        });

        res.status(200).json({
            success: true,
            message: 'Website settings updated successfully',
            data: { settings: setting }
        });
    } catch (error) {
        next(error);
    }
};
