import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloud } from './cloudinaryConfig.js'; 

// Allowed mime types
const allowedMimeTypes = ["image/jpeg", "image/png"];

const storage = new CloudinaryStorage({
    cloudinary: cloud,
    params: {
        folder: 'Home', // Cloudinary folder
        format: async (req, file) => {

            if (!file) {
                console.log('File not found');
                throw new Error('File not found');
            }

            if (!allowedMimeTypes.includes(file.mimetype)) {
                console.log('File type not supported:', file.mimetype);
                throw new Error('File type not supported');
            }

            console.log('Uploading file:', file);
            return file.mimetype.split('/')[1];  // Extract file format (e.g., jpg, png)
        },
        public_id: (req, file) => {
            const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1e9);
            console.log('Generated public_id:', uniqueId);  
            return uniqueId;  // Unique identifier for each file
        },
    },
});

// Cloudinary uploader middleware
export const cloudinaryUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file) {
            console.log('File not found');
            return cb(new Error('File not found'), false);
        }

        if (!allowedMimeTypes.includes(file.mimetype)) {
            console.log('File type not supported:', file.mimetype);
            return cb(new Error('File type not supported'), false);
        }

        cb(null, true);
    },
});
