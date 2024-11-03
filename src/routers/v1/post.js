// Here all post related routes are present

import express from 'express';
import { createPost, deletePost, getAllPosts, updatePost } from '../../controllers/postController.js';
import { cloudinaryUploader } from '../../config/multerConfig.js';
import { validate } from './../../validators/zodValidator.js';
import { zodPostSchema } from './../../validators/zodPostSchema.js';
import { isAdmin, isAuthenticated } from './../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Create a new post
 *      description: Create a new post
 * 
 */

router.post('/',isAuthenticated,cloudinaryUploader.single('image'),validate(zodPostSchema),createPost);

router.get('/',getAllPosts);

router.delete('/:id', isAuthenticated ,deletePost);

router.put('/:id',isAuthenticated,isAdmin,cloudinaryUploader.single('image'),updatePost);

export default router;

