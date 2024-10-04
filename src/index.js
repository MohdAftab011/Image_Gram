import express from 'express';
import connectDB from './config/DBConfig.js';

const PORT  = 3000;

const app = express();

app.get('/ping',(req,res)=>{
    return res.json({message: 'pong'});
});

app.listen(PORT,()=>{
    console.log(`Server is running at : ${PORT}`);
    connectDB();
});

