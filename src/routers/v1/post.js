// Here all post related routes are present

import express from 'express';
import { createPost, getAllPosts } from '../../controllers/postController.js';
import { cloudinaryUploader } from '../../config/multerConfig.js';

const router = express.Router();

router.post('/',cloudinaryUploader.single('image'),createPost);

router.get('/',getAllPosts);

export default router;

