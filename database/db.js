import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const Connection = async()=>{
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;

    const URL = `mongodb+srv://${username}:${password}@nodetuts.syfifvs.mongodb.net/chat?retryWrites=true&w=majority&appName=nodetuts`;
    try {
        await mongoose.connect(URL, {useUnifiedTopology: true})
        console.log("Connected to db successfully")
    } catch (error) { 
        console.log("Error while connecting: ", error.message)
    }
}

export default Connection;