import React, { useState, useEffect } from "react";
import { getAllArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

const AllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [clickedArticleId, setClickedArticleId] = useState(null);

  useEffect(() => {
    const fetchArticles = () => {
      getAllArticles()
        .then((data) => {
          setArticles(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };
    fetchArticles();
  }, []);

  const handleBackToArticles = () => {
    setClickedArticleId(null);
  };

  return (
    <div className="articles-div" id="allArticlesBox">
      {clickedArticleId ? (
        <ArticleCard
          handleBackToArticles={handleBackToArticles}
          clickedArticleId={clickedArticleId}
        />
      ) : (
        <>
          <h2>Click on desired article for details</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <ul id="allArticlesList">
              {articles.map((article) => (
                <Link
                  to={`/articles/${article.article_id}`}
                  key={article.article_id}
                >
                  <button className="each-article-in-list">
                    <h3>{article.title}</h3>
                    <p>by {article.author}</p>
                    <img src={article.article_img_url} alt="article image" />
                  </button>
                </Link>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default AllArticles;
