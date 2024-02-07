import React, { useState, useEffect } from "react";
import { getArticlesById } from "../utils/api";
import { useParams } from "react-router-dom";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = () => {
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
    fetchArticle();
  }, [article_id]);



  const handleBackToArticles = () => {

  };

  return (

      <div className="article-card">
        <button id="back-to-articles" onClick={handleBackToArticles}>
          Back to all articles
        </button>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt="article image" />
            <p>Article ID: {article.article_id}</p>
            <p>Topic: {article.topic}</p>
            <p>Article: {article.body}</p>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes}</p>
            <p>Created At: {article.created_at}</p>
            <p>Comment Count: {article.comment_count}</p>
          </>
        )}
      </div>

  );
};

export default ArticleCard;
