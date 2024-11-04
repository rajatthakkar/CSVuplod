"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the dotenv library to load environment variables from a .env file
const dotenv_1 = __importDefault(require("dotenv"));
// Importing the mongoose library to interact with MongoDB
const mongoose_1 = __importDefault(require("mongoose"));
// Load environment variables from .env file
dotenv_1.default.config();
// Function to create a connection to MongoDB using Mongoose
const createMongooseConnection = async () => {
    const mongoUrl = process.env.MONGO_URL; // Accessing the environment variable
    console.log(mongoUrl);
    // Checking if the MongoDB URL is defined
    if (!mongoUrl) {
        throw new Error('MongoDB connection string is not defined in the environment variables.');
    }
    try {
        // Connecting to MongoDB using the URL from environment variables
        await mongoose_1.default.connect(mongoUrl, {
        // useNewUrlParser: true,  // Deprecated, but can stay for compatibility
        // useUnifiedTopology: true, // Recommended option for MongoDB
        });
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
// Exporting the createMongooseConnection function for use in other modules
exports.default = createMongooseConnection;
