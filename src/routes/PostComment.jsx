import React, { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api";

const PostComment = (articleId) => {
  const [commentInput, setCommentInput] = useState("");

  const [finalNewCommentInput, setFinalNewCommentInput] = useState(false);

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();
    setFinalNewCommentInput({
      body: commentInput,
    });
  };

  useEffect(() => {
    if (finalNewCommentInput) {
      fetch(getCommentsByArticleId(articleId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalNewCommentInput),
      })
        .then((response) => response.json())
        .then((msg) => {
          console.log(msg);
        });
    }
  }, [finalNewCommentInput]);

  return (
    <form className="post-comment-form" onSubmit={handleNewCommentSubmit}>
      <label htmlFor="new-comment">Write Comment</label>
      <input
        type="text"
        id="new-comment"
        placeholder="I think..."
        required
        value={commentInput}
        onChange={(event) => {
          setCommentInput(event.target.value);
        }}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostComment;
