import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import Connection from './database/db.js';
import route from './routes/route.js';

dotenv.config();    
// here it will work without this because, dotenv.config() is called in Connection() function
// So once dotenv.config() is instantiated globally in the project

const app = express();
const PORT = process.env.PORT || 8000;
Connection();


app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.json());

app.use('/', route);

app.get("/", (req, res)=>{
    res.send('<p>Welcome to Chat App</p>')
})

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`)
})