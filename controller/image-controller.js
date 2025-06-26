import mongoose from "mongoose"
import grid from "gridfs-stream"
import dotenv from "dotenv";

dotenv.config();

const url = process.env.BACKEND_URL

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadFile = (req, res)=>{
    try {
        if(!req.file){
            return res.status(404).json('File not Found')
        }
    
        const imageUrl = `${url}/file/${req.file.filename}`
        res.status(200).json(imageUrl);  
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        if (!file) {
            return response.status(404).json({ msg: "File not found" });
        }
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}
