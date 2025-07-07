const commentsModel = require("../models/comments");
const postsModel = require("../models/posts");

const createComment = (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  const commenter = req.token.userId;
  console.log("comment:", comment);
  console.log("commenter:", commenter);
  console.log("postId:", postId);

  const newComment = new commentsModel({ comment, commenter });

  newComment
    .save()
    .then((result) => {
      postsModel
        .findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: result.id } },
          { new: true }
        )
        .then((result) => {
          res.status(201).json({
            success: true,
            message: "Comment Created",
            comment: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
          });
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
  createComment,
};
