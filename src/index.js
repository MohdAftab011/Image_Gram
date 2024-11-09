import express from 'express';
import connectDB from './config/DBConfig.js';
import apiRouter from './routers/apiRouter.js'
import multer from 'multer';
import { isAuthenticated } from './middleware/authMiddleware.js';
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './utils/swaggerOptions.js';
import ip from 'ip'
import {rateLimit} from 'express-rate-limit'



const PORT  = 3000;


const app = express();

const upload = multer();

app.use(express.json()); // add middleware to every request
app.use(express.text());
app.use(express.urlencoded());


const limiter = rateLimit({
    windowMs : 0.5*60*1000,
    max : 5
});
app.use(limiter);


const swaggerDocs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api',apiRouter);

app.get('/ping',(req,res)=>{
    console.log(req.body);
    const ipaddr = ip.address();
    return res.json({message: 'pong' + ipaddr});
});



app.listen(PORT,()=>{
    console.log(`Server is running at : ${PORT}`);
    connectDB();
});

