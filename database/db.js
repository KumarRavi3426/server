import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const Connection = async()=>{

    const URL = process.env.DB_URI;
    try {
        await mongoose.connect(URL, {useUnifiedTopology: true})
        console.log("Connected to db successfully")
    } catch (error) { 
        console.log("Error while connecting: ", error.message)
    }
}

export default Connection;