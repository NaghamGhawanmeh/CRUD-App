const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  updatePostById,
} = require("../controllers/posts");
const postsRouter = express.Router();

postsRouter.post("/createPost", createPost);
postsRouter.get("/getAllPosts", getAllPosts);
postsRouter.get("/getPostById/:postId", getPostById);
postsRouter.delete("/deletePostById/:postId", deletePostById);
postsRouter.put("/updatePostById/:postId", updatePostById);

module.exports = postsRouter;
