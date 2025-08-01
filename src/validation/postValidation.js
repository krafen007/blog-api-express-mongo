// Joi schemas for post creation and update validation

import Joi from "joi";

// Schema for creating a post
export const createPostSchema = Joi.object({
  title: Joi.string().min(10).max(200).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 10 characters",
    "string.max": "Title must not exceed 200 characters",
    "any.required": "Title is required",
  }),

  content: Joi.string().min(10).max(200).required().messages({
    "string.empty": "Content is required",
    "string.min": "Content must be at least 10 characters",
    "string.max": "Content must not exceed 200 characters",
    "any.required": "Content is required",
  }),

  image: Joi.string().uri().messages({
    "string.uri": "Image must be a valid URL",
  }),
});

// Schema for updating a post
export const updatePostSchema = Joi.object({
  title: Joi.string().min(10).max(200).messages({
    "string.min": "Title must be at least 10 characters",
    "string.max": "Title must not exceed 200 characters",
  }),

  content: Joi.string().min(10).max(200).messages({
    "string.min": "Content must be at least 10 characters",
    "string.max": "Content must not exceed 200 characters",
  }),

  image: Joi.string().uri().messages({
    "string.uri": "Image must be a valid URL",
  }),
});
