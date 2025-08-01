// Controller logic for Post resource (CRUD operations)

import postModel from "../models/postModel.js";

/**
 * @desc   Get all posts
 * @route  GET /api/posts
 * @access Public
 */
export const getAllPosts = async (req, res) => {
  try {
    // Get search value from query (searchQuery ? query == null: empty string) -> err: mongoDb wait string value not null
    const searchQuery = req.query.search ? req.query.search : "";

    // Fetch posts that match the search in title
    const posts = await postModel
      .find({ title: { $regex: searchQuery, $options: "i" } })
      // Replace author ID with actual user data (only firstName + lastName)
      .populate({
        path: "author",
        select: "firstName lastName",
      });
    return res.status(200).json({
      message: "Get all posts successfully",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while creating post",
      error: error.message,
    });
  }
};

/**
 * @desc   Get single post by id
 * @route  GET /api/post/:id
 * @access Public
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id).populate({
      path: "author",
      select: "firstName lastName",
    });

    return res.status(200).json({
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while fetching post",
      error: error.message,
    });
  }
};

/**
 * @desc   Create a new post
 * @route  POST /api/post
 * @access Admin
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    const post = await postModel.create({
      title,
      content,
      image,
      author: req.user._id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while creating post",
      error: error.message,
    });
  }
};

/**
 * @desc   Update exists post
 * @route  PUT /api/post/:id
 * @access Admin
 */
export const updatePost = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const findPost = await postModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate("author", "firstName lastName");

    return res.status(200).json({
      message: "Post updated successfully",
      data: findPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while updating post",
      error: error.message,
    });
  }
};

/**
 * @desc   Delete post
 * @route  DELETE /api/post/:id
 * @access Admin
 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await postModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while deleting post",
      error: error.message,
    });
  }
};
