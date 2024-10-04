// server --> ODM --> database
import mongoose from 'mongoose';
import { DB_URL } from './serverConfig.js';

export default async function connectDB(){
    try{
        await mongoose.connect(DB_URL);
        console.log('Connected to MongoBD');
    }
    catch(error){
        console.log('Something Went Wrong');4
        console.log(error);
    }
}