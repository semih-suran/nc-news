import React, { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComment = () => {
      getCommentsByArticleId(article_id)
        .then((data) => {
          setComment(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };
    fetchComment();
  }, [article_id]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul className="comments-for-article">
          <button id="add-comment">Add a Comment</button>
          <h2>Comments</h2>
          {comments.map((comment) => (
            <li className="each-comment" key={comment.comment_id}>
              <section className="user-in-comments">
              <p>-- maybe -USER AVATAR- here --</p>
              <p>{comment.author}</p>
              </section>
              <p>{comment.body}</p>
              <p>{comment.created_at}</p>
              <p>Votes: {comment.votes}</p>
              <button>Vote 👍</button>
              <button>Vote 👎</button>
              <br />
              <button id="delete-comment">🚫 Delete Comment 🚫</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
