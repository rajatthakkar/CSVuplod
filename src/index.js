"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express"); // Correctly use default import
var dotenv = require("dotenv");
var home_1 = require("./routes/home.routes");
var path = require("path");
dotenv.config(); // This loads the .env file
var server = express(); // Now this works correctly
// Middleware to parse JSON requests
server.use(express.json());
// Use the router for API routes
server.use('/api',routerHome)
// Set the views directory for rendering views
server.set("views", path.join(path.resolve(), "src", "views"));
// Define the port from environment variables
var PORT = process.env.PORT || 3000; // Fallback to 3000 if not defined
;
// Start the server
server.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
});
