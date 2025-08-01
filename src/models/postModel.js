// Mongoose schema and model for blog Post

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      minlength: [10, "Post title must be at least 10 characters"],
      maxlength: [100, "Post title must not deced 100 characters"],
    },

    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: [10, "Post content must be at least 10 characters"],
      maxlength: [500, "Post content must not exceed 500 characters"],
    },

    image: {
      type: String,
      default: "",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
