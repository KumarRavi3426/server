import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

// doubt in this part

const storage = new GridFsStorage({
  url: process.env.DB_URI,
  options: { useNewUrlParser: true },
  file: async (req, file)=>{
    console.log("Uploaded file MIME type:", file.mimetype);
    const match = ["image/png", "image/jpg", "image/jpeg"];
[]
    // if(match.indexOf(file.mimetype)===-1){
    //   return `${Date.now()}-file-${file.originalname}`
    // }

    // if (!match.includes(file.mimetype)) {
    //   throw new Error("Invalid file type");
    // }
    
    return {
      // bucketName: 'photos',
      filename: `${Date.now()}-file-${file.originalname}`,
    }
  }
});



export default multer({storage})