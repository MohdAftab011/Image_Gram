import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloud } from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary: cloud,
    params: {
        folder: 'Home', // Customize the folder in Cloudinary where files will be uploaded
        format: async (req, file) => {
            console.log('Uploading file:', file);
            return file.mimetype.split('/')[1];  // Automatically get file format (e.g., jpg, png)
        },
        public_id: (req, file) => {
            const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1e9);
            console.log('Generated public_id:', uniqueId);  
            return uniqueId;  // Unique identifier for each file
        },
    },
});

export const cloudinaryUploader = multer({ storage: storage });
