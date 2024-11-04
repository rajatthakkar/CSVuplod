import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs'
import csvParser from 'csv-parser';
export default class HomeController {
  private uploadDirectory: string;

  constructor() {
    // Log message in the constructor
    console.log("inside controller");
    this.uploadDirectory = path.join(__dirname, '../uploads');
  }

  renderHomePage = async (req: Request, res: Response): Promise<void> => {
    const uploadDir = path.join(__dirname, '..', 'upload'); // Adjust the path as needed
    console.log("inside renderHomePage");

    // Read the contents of the upload directory
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.error('Error reading upload directory:', err);
        return res.status(500).send('Error reading files');
      }

      const fileDetailsPromises = files.map(file => {
        const filePath = path.join(uploadDir, file);

        return new Promise((resolve, reject) => {
          // Get detailed stats for each file
          fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error('Error getting file stats:', err);
              return reject(err);
            }

            // Resolve with the file details
            resolve({
              name: file,
              size: stats.size,
              createdAt: stats.birthtime,
              modifiedAt: stats.mtime
            });
          });
        });
      });

      // Wait for all file detail promises to complete
      Promise.all(fileDetailsPromises)
        .then(fileDetails => {
          // Render the 'home.ejs' template with file details
          console.log("details", fileDetails)
          res.render('home', { files: fileDetails });
        })
        .catch(error => {
          console.error('Error processing files:', error);
          res.status(500).send('Error processing files');
        });
    });
  };
  
  validatedFile = async (req: Request, res: Response): Promise<void> => {
    console.log("inside validation function")
    console.log("Inside validatedFile function");
   
    if (req.file) {

      console.log("File uploaded successfully:", req.file);
      return res.redirect('/api')
      // Explicit status code for redirection
    } else {
      console.log("File upload failed.");
      res.status(400).send("Failed to upload file.");
    }
    
  }
  showFileData = async (req: Request, res: Response): Promise<void> => {
    try {
      // Get the filename from the URL parameter
      const fileName = req.params.id;
      console.log("🚀 ~ HomeController ~ showFileData= ~ req:", req.params)
      console.log("🚀 ~ HomeController ~ showFileData= ~ fileName:", fileName)

      // Set the path to the upload directory
      const uploadDir = path.join(__dirname, '..', 'upload');
      const filePath = path.join(uploadDir, fileName);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        res.status(404).send('File not found');
        return;  // Exit function to match void return type
      }

      // Array to hold CSV data
      const csvData: any[] = [];

      // Read and parse the CSV file
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => csvData.push(row))
       
        .on('end', () => {
          // Render the data in the view or send as JSON
          console.log("🚀 ~ HomeController ~ showFileData= ~ csvData:", csvData)
          res.render('show', { csvData });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while processing the file');
    }
  };

}