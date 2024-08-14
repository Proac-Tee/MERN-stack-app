import dotenv from "dotenv";
import express, { Express } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { router } from "./routes/routes";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app: Express = express();

// Middleware to restrict cross origin access
app.use(
  cors({
    origin: "http://localhost:5173", // Specify the origin allowed to access your backend
    methods: ["GET,POST,PATCH,DELETE"], // Specify the HTTP methods allowed
    credentials: true, // Allow cookies and HTTP authentication to be included in requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
  })
);

// Set the port from environment variables or use a default value
const PORT = process.env.PORT || 3000;

main().catch((error) => console.error("Error connecting to database", error));

// Function to connect to the database
async function main() {
  await connect(process.env.MONGODB_URI || ""); // Connect to MongoDB
  console.log("Connected to database");
}

// Middleware to parse JSON bodies
app.use(express.json({ limit: "1mb" })); // Parse incoming JSON requests

app.use("/api", router); // Mount API routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
