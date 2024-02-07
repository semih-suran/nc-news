import React, { useState, useEffect } from "react";
import { getArticlesById } from "../utils/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";

const ArticleCard = ({ handleArticlesClick }) => {
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

  return (
    <div className="articles-div" id="article-card">
      <Link to="/articles" id="back-to-articles" onClick={handleArticlesClick}>
        Back to All Articles
      </Link>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <h2>{article.title}</h2>
          <img src={article.article_img_url} alt="article image" />
          <p>{article.body}</p>
          <p>Written By: {article.author}</p>
          <p>Category: {article.topic}</p>
          <p>Votes: {article.votes}</p>
          <p>Article ID: {article.article_id}</p>
          <p>Created At: {article.created_at}</p>
          <p>{article.comment_count} Comments</p>
          <Comments />
        </>
      )}
    </div>
  );
};

export default ArticleCard;
