const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema(
  {
    text: String,
    userName: String,
    userEmail: String,
    userThumb: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// singular capitalized name for the mongo collection - Products
const Comment = mongoose.model("Comment", CommentsSchema);

module.exports = Comment;
