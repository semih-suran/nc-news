import React, { useState, useEffect } from "react";
import { getAllArticles } from "../utils/api";

const AllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="articles-div">
      <h2>Click on desired article for details</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <button key={article.article_id}>
              <li>
                <h3>{article.title}</h3>
                <p>by {article.author}</p>
                <img src={article.article_img_url} alt="article image" />
              </li>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllArticles;
