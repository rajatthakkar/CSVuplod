import multer from 'multer';
import path from 'path';
import fs from 'fs';
 console.log("inside multer page")
 const uploadDirectory = path.join(__dirname, '../upload');
console.log("out side if")
if (!fs.existsSync(uploadDirectory)) {
   console.log("in side if")
    fs.mkdirSync(uploadDirectory);  // Ensures the uploads directory exists
}

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log("Saving file to directory...");
      cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
      const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      console.log("Generated filename:", fileName);
      cb(null, fileName);
  }
});

const upload = multer({ storage: storageConfig });

export default upload;
