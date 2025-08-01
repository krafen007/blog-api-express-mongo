// User registration and login controller logic

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import userModel from "../models/userModel.js";

/**
 * @desc Register new user
 * @route POST /api/user/register
 * @access Public
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;

    const existsUser = await userModel.findOne({ email });

    // Check if user already exists
    if (existsUser) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await userModel.create({
      firstName,
      lastName,
      age,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return res.status(201).json({
      message: "User account created successfully.",
      token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while creation user account!",
      error: error.message,
    });
  }
};

/**
 * @desc Log in existing user
 * @route POST /api/user/login
 * @access Public
 */
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with email (include password)
    const existsUser = await userModel.findOne({ email }).select("+password");

    if (!existsUser) {
      return res.status(404).json({
        message: "No user found with this email!",
      });
    }

    // Compare passwords
    const passwordMatching = await bcrypt.compare(
      password,
      existsUser.password
    );

    if (!passwordMatching) {
      return res.status(400).json({
        message: "Incorrect password. Please try again.",
      });
    }

    // Generate token
    const token = jwt.sign({ userId: existsUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    // Remove password from response
    const user = existsUser.toObject();
    delete user.password;

    return res.status(200).json({
      message: "Logged in successfully.",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error during login process.",
      error: error.message,
    });
  }
};
