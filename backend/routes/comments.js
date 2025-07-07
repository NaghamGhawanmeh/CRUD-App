const express = require("express");
const authentication = require("../middleware/authentication");

const { createComment } = require("../controllers/comments");
const commentsRouter = express.Router();
commentsRouter.put("/createComment/:postId", authentication, createComment);

module.exports = commentsRouter;
