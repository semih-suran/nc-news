import React, { useState } from "react";
import { deleteCommentsById } from "../utils/api";

const DeleteComment = ({ commentId, commentAuthor, loggedInUser, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) return;
    setIsDeleting(true);
    deleteCommentsById(commentId)
      .then(() => {
        onDelete(commentId);
      })
      .catch((error) => {
        console.error("Failed to delete comment:", error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div>
      {loggedInUser === commentAuthor && (
        <>
          {isDeleting ? (
            <p>Deleting...</p>
          ) : (
            <button id="delete-comment" onClick={handleDelete}>
              🚫 Delete Comment 🚫
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default DeleteComment;
