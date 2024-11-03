import express from 'express';
import connectDB from './config/DBConfig.js';
import apiRouter from './routers/apiRouter.js'
import multer from 'multer';
import { isAuthenticated } from './middleware/authMiddleware.js';
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './utils/swaggerOptions.js';



const PORT  = 3000;


const app = express();

const upload = multer();

app.use(express.json()); // add middleware to every request
app.use(express.text());
app.use(express.urlencoded());





const swaggerDocs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api',apiRouter);

app.get('/ping',isAuthenticated,(req,res)=>{
    console.log(req.body);
    return res.json({message: 'pong'});
});



app.listen(PORT,()=>{
    console.log(`Server is running at : ${PORT}`);
    connectDB();
});

