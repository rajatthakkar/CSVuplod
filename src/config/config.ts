// Importing the dotenv library to load environment variables from a .env file
import dotenv from 'dotenv'; 
// Importing the mongoose library to interact with MongoDB
import mongoose from 'mongoose'; 

// Load environment variables from .env file
dotenv.config(); 

// Function to create a connection to MongoDB using Mongoose
const createMongooseConnection = async () => {
    const mongoUrl = process.env.MONGO_URL; // Accessing the environment variable
      console.log(mongoUrl)
    // Checking if the MongoDB URL is defined
    if (!mongoUrl) {
        throw new Error('MongoDB connection string is not defined in the environment variables.');
    }

    try {
        // Connecting to MongoDB using the URL from environment variables
        await mongoose.connect(mongoUrl, {
            // useNewUrlParser: true,  // Deprecated, but can stay for compatibility
            // useUnifiedTopology: true, // Recommended option for MongoDB
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// Exporting the createMongooseConnection function for use in other modules
export default createMongooseConnection; 
