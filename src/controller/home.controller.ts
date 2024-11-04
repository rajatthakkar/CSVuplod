import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs'
export default class HomeController {
    private uploadDirectory: string;

    constructor() {
        // Log message in the constructor
        console.log("inside controller");
        this.uploadDirectory = path.join(__dirname, '../uploads');
    }


    renderHomePage = async (req: Request, res: Response): Promise<void> => {
        
        // console.log("inside renderHome page");
        // const filePath = path.join(path.resolve(), 'src', 'views', 'home.ejs');
        // console.log("path", filePath);
        // // Use sendFile to send the HTML file
        // res.render(filePath);
        const uploadDir = path.join(__dirname, '..', 'upload'); // Adjust the path as needed
        console.log("inside renderHomePage");
      
        fs.readdir(uploadDir, (err, files) => {
          if (err) {
            console.error('Error reading upload directory:', err);
            return res.status(500).send('Error reading files');
          }
            console.log("Files",files)
          // Render  the 'home.ejs' template and pass the files array
          res.render('home', { files });
        });
    };
    validatedFile = async (req: Request, res: Response): Promise<void> => {
        console.log("inside validation function")
        console.log("Inside validatedFile function");
        if (req.file) {
            console.log("File uploaded successfully:", req.file);
            res.status(200).send("File uploaded successfully.");
        } else {
            console.log("File upload failed.");
            res.status(400).send("Failed to upload file.");
        }

    }

}





