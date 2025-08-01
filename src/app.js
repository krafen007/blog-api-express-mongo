// Express app configuration

import express from "express";
import morgan from "morgan";
import cors from "cors";

import usrRouter from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

const app = express();

// Middlewares
app.use(express.json()); // Parse JSON requests
app.use(cors());         // Enable CORS
app.use(morgan("dev"));  // Logging requests

// API routes
app.use("/api/user", usrRouter);
app.use("/api/posts", postRoute);

export default app;
