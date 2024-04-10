import React, { useState, useEffect } from "react";
import { getCommentsByArticleId, getAllUsers } from "../utils/api";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment";
import DeleteComment from "./DeleteComment";
import { useUser } from "../components/UserContext";

const Comments = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [avatarUrls, setAvatarUrls] = useState({});
  const { selectedUser } = useUser();

  useEffect(() => {
    setIsLoading(true);
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByArticleId(article_id);
        setComments(commentsData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [article_id]);

  useEffect(() => {
    const fetchAvatarUrls = async () => {
      const allUsers = await getAllUsers();
      const userAvatarUrls = {};
      allUsers.users.forEach((user) => {
        userAvatarUrls[user.username] = user.avatar_url;
      });
      setAvatarUrls(userAvatarUrls);
    };
    fetchAvatarUrls();
  }, []);

  const handleCommentPosted = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleDeleteComment = (deletedCommentId) => {
    setComments(comments.filter((comment) => comment.comment_id !== deletedCommentId));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul className="comments-for-article">
          <h2>Comments</h2>
          <PostComment
            article_id={article_id}
            handleCommentPosted={handleCommentPosted}
          />
          {comments.length === 0 && <p>There are no comments yet...</p>}
          {comments.map((comment) => (
            <li className="each-comment" key={comment.comment_id}>
              <section className="user-in-comments">
                <img src={avatarUrls[comment.author]} alt="user avatar" />
                <p>{comment.author}</p>
              </section>
              <p>{comment.body}</p>
              <p>{comment.created_at}</p>
              <p>Votes: {comment.votes}</p>
              <button>Vote 👍</button>
              <button>Vote 👎</button>
              <br />
              <DeleteComment
                commentId={comment.comment_id}
                commentAuthor={comment.author}
                loggedInUser={selectedUser}
                onDelete={handleDeleteComment}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
