// Mongoose schema and model for User

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "User first name is required"],
      minlength: [3, "User first name at least must be 3 characters"],
      maxlength: [15, "User first name must not exceed 15 characters"],
    },

    lastName: {
      type: String,
      required: [true, "User last name is required"],
      minlength: [3, "User last name at least must be 3 characters"],
      maxlength: [15, "User last name must not exceed 15 characters"],
    },

    age: {
      type: Number,
      required: [true, "User age is required"],
      min: [16, "You should be older than 16 years"],
    },

    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "User password is required"],
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "reader"],
      default: "reader",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
