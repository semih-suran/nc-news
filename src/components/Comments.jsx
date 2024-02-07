import React, { useState, useEffect } from "react";
import { getArticlesById } from "../utils/api";
import { useParams } from "react-router-dom";

const CommentsByArticleId = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCommentsByArticleId = () => {
      getArticlesById(article_id)
        .then((data) => {
          setArticle(data[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };
    getCommentsByArticleId();
  }, [article_id]);

  return (
    <>
      <div>
        <p>whats up</p>
      </div>
    </>
  );
};

export default CommentsByArticleId;
