import React, { useState } from "react";
import { postMyComment } from "../utils/api";
import { useUser } from "./UserContext";

const PostComment = ({ article_id, handleCommentPosted }) => {
  const { selectedUser } = useUser();
  // change username to an non-existent one then try posting for error message
  const [commentBody, setCommentBody] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();
    if (isPostingComment) return;

    const commentData = {
      username: selectedUser,
      body: commentBody,
    };

    const newComment = {
      comment_id: Date.now(), // optimistic purposes faked
      author: selectedUser,
      body: commentBody,
      created_at: new Date().toISOString(),
      votes: 0,
    };

    setIsPostingComment(true);

    postMyComment(article_id, commentData)
      .then(() => {
        setIsPostingComment(false);
        setCommentBody("");
        handleCommentPosted(newComment);
      })
      .catch((error) => {
        alert("Can not post right now...");
        setCommentBody("");
        setIsPostingComment(false);
      });
  };

  const togglePostComment = () => {
    setShowPostComment(!showPostComment);
  };

  return (
    <>
      <button id="add-comment" onClick={togglePostComment}>
        Write a Comment ✍🏻
      </button>
      {showPostComment && (
        <form className="post-comment-form" onSubmit={handleNewCommentSubmit}>
          <label htmlFor="new-comment"></label>
          <textarea
            id="new-comment"
            placeholder="My Comment..."
            required
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            disabled={isPostingComment}
          ></textarea>
          <button id="post-button" type="submit" disabled={isPostingComment}>
            Post 📨
          </button>
        </form>
      )}
    </>
  );
};

export default PostComment;
