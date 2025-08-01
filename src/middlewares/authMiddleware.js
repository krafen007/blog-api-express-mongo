// Middleware to validate JWT token and attach user info to request

import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const validateJWT = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;

    if (!authHead || !authHead.startsWith("Bearer ")) {
      return res.status(401).json({
        message:
          "Not authorized. Token missing or badly formatted. Use: 'Bearer <token>'",
      });
    }

    const token = authHead.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "Not authorized, user not found!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Internal server error while authorized",
      error: error.message,
    });
  }
};

export default validateJWT;
