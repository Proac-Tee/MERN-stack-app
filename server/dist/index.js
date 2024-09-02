"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
const errorHandler_1 = require("./middlewares/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize the Express application
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// Set the port from environment variables or use a default value
const PORT = process.env.PORT || 3000;
main().catch((error) => console.error("Error connecting to database", error));
// Function to connect to the database
async function main() {
    await (0, mongoose_1.connect)(process.env.MONGODB_URI || ""); // Connect to MongoDB
    console.log("Connected to database");
}
// Middleware to restrict cross origin access
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:3000", // Specify the origin allowed to access your backend
    methods: ["GET,POST,PUT,DELETE"], // Specify the HTTP methods allowed
    credentials: true, // Allow cookies and HTTP authentication to be included in requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
}));
// Middleware to parse JSON bodies
app.use(express_1.default.json({ limit: "1mb" })); // Parse incoming JSON requests
// Routes
app.use("/api", routes_1.router); // Mount API routes
// Error handling
app.use(errorHandler_1.errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
