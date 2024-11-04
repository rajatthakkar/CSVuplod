"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
class HomeController {
    uploadDirectory;
    constructor() {
        // Log message in the constructor
        console.log("inside controller");
        this.uploadDirectory = path_1.default.join(__dirname, '../uploads');
    }
    renderHomePage = async (req, res) => {
        const uploadDir = path_1.default.join(__dirname, '..', 'upload'); // Adjust the path as needed
        console.log("inside renderHomePage");
        // Read the contents of the upload directory
        fs_1.default.readdir(uploadDir, (err, files) => {
            if (err) {
                console.error('Error reading upload directory:', err);
                return res.status(500).send('Error reading files');
            }
            const fileDetailsPromises = files.map(file => {
                const filePath = path_1.default.join(uploadDir, file);
                return new Promise((resolve, reject) => {
                    // Get detailed stats for each file
                    fs_1.default.stat(filePath, (err, stats) => {
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
                console.log("details", fileDetails);
                res.render('home', { files: fileDetails });
            })
                .catch(error => {
                console.error('Error processing files:', error);
                res.status(500).send('Error processing files');
            });
        });
    };
    validatedFile = async (req, res) => {
        console.log("inside validation function");
        console.log("Inside validatedFile function");
        if (req.file) {
            console.log("File uploaded successfully:", req.file);
            return res.redirect('/api');
            // Explicit status code for redirection
        }
        else {
            console.log("File upload failed.");
            res.status(400).send("Failed to upload file.");
        }
    };
    showFileData = async (req, res) => {
        try {
            // Get the filename from the URL parameter
            const fileName = req.params.id;
            console.log("🚀 ~ HomeController ~ showFileData= ~ req:", req.params);
            console.log("🚀 ~ HomeController ~ showFileData= ~ fileName:", fileName);
            // Set the path to the upload directory
            const uploadDir = path_1.default.join(__dirname, '..', 'upload');
            const filePath = path_1.default.join(uploadDir, fileName);
            // Check if file exists
            if (!fs_1.default.existsSync(filePath)) {
                res.status(404).send('File not found');
                return; // Exit function to match void return type
            }
            // Array to hold CSV data
            const csvData = [];
            // Read and parse the CSV file
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => csvData.push(row))
                .on('end', () => {
                // Render the data in the view or send as JSON
                console.log("🚀 ~ HomeController ~ showFileData= ~ csvData:", csvData);
                res.render('show', { csvData });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while processing the file');
        }
    };
}
exports.default = HomeController;
