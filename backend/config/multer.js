import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directories exist
const uploadPath = process.env.UPLOAD_PATH || './uploads';
const directories = ['services', 'portfolio', 'documents'];

directories.forEach(dir => {
    const fullPath = path.join(uploadPath, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'documents'; // default

        if (file.fieldname === 'serviceImage') {
            folder = 'services';
        } else if (file.fieldname === 'portfolioImages' || file.fieldname === 'portfolioImage') {
            folder = 'portfolio';
        }

        cb(null, path.join(uploadPath, folder));
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-randomstring-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

        cb(null, `${sanitizedName}-${uniqueSuffix}${ext}`);
    }
});

// File filter - Accept only images and PDFs
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = /jpeg|jpg|png|gif|webp|svg/;
    const allowedDocTypes = /pdf/;

    const extname = path.extname(file.originalname).toLowerCase().slice(1);
    const mimetype = file.mimetype;

    // Check if it's an image
    const isImage = allowedImageTypes.test(extname) && mimetype.startsWith('image/');

    // Check if it's a PDF
    const isPDF = allowedDocTypes.test(extname) && mimetype === 'application/pdf';

    if (isImage || isPDF) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF, WebP, SVG) and PDFs are allowed.'), false);
    }
};

// File size limit from environment or default 5MB
const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || 5242880); // 5MB default

// Multer configurations for different upload scenarios
export const uploadSingle = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }
}).single('image');

export const uploadServiceImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }
}).single('serviceImage');

export const uploadPortfolioImages = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: maxFileSize,
        files: 10 // Maximum 10 images per portfolio item
    }
}).array('portfolioImages', 10);

export const uploadDocument = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }
}).single('document');

// Helper function to delete file
export const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting file:', error);
        return false;
    }
};

// Helper to get file URL
export const getFileUrl = (req, filename, folder = 'documents') => {
    const protocol = req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}/uploads/${folder}/${filename}`;
};

export default {
    uploadSingle,
    uploadServiceImage,
    uploadPortfolioImages,
    uploadDocument,
    deleteFile,
    getFileUrl
};
