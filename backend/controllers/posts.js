const postModel = require("../models/posts");
const postsModel = require("../models/posts");
const commentsModel = require("../models/posts");

const createPost = (req, res) => {
  const { title, description, media } = req.body;

  const newPost = new postsModel({ title, description, media });

  newPost
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Post Created",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    });
};
const getAllPosts = (req, res) => {
  postsModel
    .find({})
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the Posts",
        posts: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    });
};

const getPostById = (req, res) => {
  const { postId } = req.params;

  postModel
    .find({ _id: postId })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `This is the post with the id (${postId}) `,
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    });
};

const deletePostById = (req, res) => {
  const { postId } = req.params;

  postModel
    .deleteOne({ _id: postId })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `This post with the id (${postId}) deleted successfully `,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    });
};

const updatePostById = (req, res) => {
  const { postId } = req.params;
  const { title, description, media } = req.body;
  postModel
    .findByIdAndUpdate(
      { _id: postId },
      { title, description, media },
      { new: true }
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `The post with the id (${postId}) updated successfully `,
        updatedPost: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    });
};
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  updatePostById,
};
