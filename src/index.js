import express from 'express';
import connectDB from './config/DBConfig.js';
import { createPost } from './controllers/postController.js';
import { cloudinaryUploader } from './config/multerConfig.js';

const PORT  = 3000;

const app = express();

app.use(express.json()); // add middleware to every request
app.use(express.text());
app.use(express.urlencoded());

app.get('/ping',(req,res)=>{
    console.log(req.body);
    return res.json({message: 'pong'});
});

app.post('/posts',cloudinaryUploader.single('image'),createPost);

app.listen(PORT,()=>{
    console.log(`Server is running at : ${PORT}`);
    connectDB();
});

