import express from 'express';
import connectDB from './config/DBConfig.js';
import apiRouter from './routers/apiRouter.js'
import multer from 'multer';

const PORT  = 3000;

const app = express();

const upload = multer();

app.use(express.json()); // add middleware to every request
app.use(express.text());
app.use(express.urlencoded());



app.use('/api',apiRouter);

app.get('/ping',(req,res)=>{
    console.log(req.body);
    return res.json({message: 'pong'});
});



app.listen(PORT,()=>{
    console.log(`Server is running at : ${PORT}`);
    connectDB();
});

