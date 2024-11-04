import  express from 'express'; // Correctly use default import
import * as dotenv from 'dotenv';
import { routerHome } from './routes/home.routes';
import * as path from 'path';
import createMongooseConection from './config/config';
dotenv.config(); // This loads the .env file

const server = express(); // Now this works correctly
server.use(express.urlencoded({extended:true}))
// setup view engine settings
server.set("view engine", "ejs");
// path of our views
server.set("views", path.join(path.resolve(),"src",'views')); 


// Middleware to parse JSON requests
server.use(express.json());
server.use('/api', routerHome);
 

// Define the port from environment variables
const PORT: string | number = process.env.PORT || 3000; // Fallback to 3000 if not defined

// Use the router for API routes

 
// Start the server
server.listen(PORT, () => {
    createMongooseConection()
    console.log(`Server is listening on port ${PORT}`);
});
