// Here all post related routes are present

import express from 'express';
import { createPost, deletePost, getAllPosts, updatePost } from '../../controllers/postController.js';
import { cloudinaryUploader } from '../../config/multerConfig.js';
import { validate } from './../../validators/zodValidator.js';
import { zodPostSchema } from './../../validators/zodPostSchema.js';

const router = express.Router();

router.post('/',cloudinaryUploader.single('image'),validate(zodPostSchema),createPost);

router.get('/',getAllPosts);

router.delete('/:id',deletePost);

router.put('/:id',cloudinaryUploader.single('image'),updatePost);

export default router;

