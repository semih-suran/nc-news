import React, { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";
import PostComment from "../routes/PostComment"

const Comments = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const handleCommentPosted = (newComment) => {
    setComments([newComment, ...comments]);
  };

  useEffect(() => {
    const fetchComment = () => {
      getCommentsByArticleId(article_id)
        .then((data) => {
          setComments(data);
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
          <h2>Comments</h2>
          <PostComment article_id={article_id} handleCommentPosted={handleCommentPosted} />
          {comments.length === 0 && <p>There are no comments yet...</p>}
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
