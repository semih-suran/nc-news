import React, { useState } from "react";
import { postMyComment } from "../utils/api";

const PostComment = ({ article_id, handleCommentPosted }) => {
  const [username, setUsername] = useState("happyamy2016");
  // change username to an non-existent one then try posting for error message
  const [commentBody, setCommentBody] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();
    if (isPostingComment) return;

    const commentData = {
      username: username,
      body: commentBody,
    };

    const newComment = {
      comment_id: Date.now(), // optimistic purposes faked
      author: username,
      body: commentBody,
      created_at: new Date().toISOString(),
      votes: 0,
    };

    setIsPostingComment(true);
    handleCommentPosted(newComment);

    postMyComment(article_id, commentData)
      .then(() => {
        setIsPostingComment(false);
        setCommentBody("");
      })
      .catch((error) => {
        setCommentBody("Can not post right now...");
        setIsPostingComment(false);
      });
  };

  const togglePostComment = () => {
    setShowPostComment(!showPostComment);
  };

  return (
    <>
      <button id="add-comment" onClick={togglePostComment}>
        Add a Comment
      </button>
      {showPostComment && (
        <form className="post-comment-form" onSubmit={handleNewCommentSubmit}>
          <label htmlFor="new-comment">Write Comment: </label>
          <input
            type="text"
            id="new-comment"
            placeholder="My Comment..."
            required
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            disabled={isPostingComment}
          />
          <button type="submit" disabled={isPostingComment}>
            Post
          </button>
        </form>
      )}
    </>
  );
};

export default PostComment;
