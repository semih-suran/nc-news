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
    setComments(
      comments.filter((comment) => comment.comment_id !== deletedCommentId)
    );
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
              <div className="user-info">
                <img src={avatarUrls[comment.author]} alt="user avatar" />
              </div>
              <div className="comment-text">
                <p className="comment-author">{comment.author}</p>
                <p>{comment.body}</p>
                <p className="time-stamp">
                  Posted on: {comment.created_at.substring(0, 10)} at{" "}
                  {comment.created_at.substring(11, 19)}
                </p>
                {selectedUser === comment.author && (
                  <DeleteComment
                    commentId={comment.comment_id}
                    onDelete={handleDeleteComment}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
