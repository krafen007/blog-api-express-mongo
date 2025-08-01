// Routes for user registration and login

import express from "express";
import { logIn, register } from "./../controllers/userController.js";
import validate from "../middlewares/validationMiddleware.js";
import { logInSchema, registerSchema } from "../validation/userValidation.js";

const router = express.Router();

// Register route
router.post("/register", validate(registerSchema), register);

// Login route
router.post("/login", validate(logInSchema), logIn);

export default router;
