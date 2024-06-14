import express, { Router } from 'express';
import multer from 'multer';
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();
// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDcloud_name, 
  api_key:process.env.api_key,
  api_secret:process.env.api_secret,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:   {
    folder: 'personal',
    format:  'png', 
   public_id:  (req, file)   => file.originalname,
  },
});

// Configure multer
const upload = multer({ storage: storage });

const router1 = express.Router();

router1.post('/upload', upload.single('file'), (req, res, next) => {
  cloudinary.uploader.upload(req.file.path, function(error, result) {
    if (error) {
      // handle error
      console.error('Upload to cloudinary failed: ', error);
      res.status(500).send('Upload to cloudinary failed');
    } else {
   
      res.json({ fileUrl: result.url });
    }
  });
});

export default router1;