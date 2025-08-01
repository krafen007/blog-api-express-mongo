// Entry point of the application

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

const PORT = process.env.PORT;

// Start MongoDB connection
connectDB();

// Start server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
