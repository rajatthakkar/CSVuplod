"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
console.log("inside multer page");
const uploadDirectory = path_1.default.join(__dirname, '../upload');
console.log("out side if");
if (!fs_1.default.existsSync(uploadDirectory)) {
    console.log("in side if");
    fs_1.default.mkdirSync(uploadDirectory); // Ensures the uploads directory exists
}
const storageConfig = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving file to directory...");
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname);
        console.log("Generated filename:", fileName);
        cb(null, fileName);
    }
});
const upload = (0, multer_1.default)({ storage: storageConfig });
exports.default = upload;
