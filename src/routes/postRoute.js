// Routes for blog post operations (CRUD)

import express from "express";
import validate from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/postController.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validation/postValidation.js";


const router = express.Router();

// Public: get all posts or search
router.get("/", getAllPosts);

// Public: get single post by id
router.get("/:id", getPostById);

// Admin only: create post
router.post("/",authMiddleware, authorizeRoles, validate(createPostSchema), createPost);

// Admin only: update post by id
router.put("/:id", authMiddleware, authorizeRoles, validate(updatePostSchema), updatePost);


// Admin only: delete post by id
router.delete("/:id", authMiddleware, authorizeRoles, deletePost);

export default router;
