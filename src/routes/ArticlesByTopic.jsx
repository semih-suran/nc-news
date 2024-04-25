import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticlesByTopic } from "../utils/api";

const ArticlesByTopic = ({ topic }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (topic) {
      fetchArticles(topic);
    } else {
      setArticles([]);
    }
  }, [topic]);

  const fetchArticles = (topic) => {
    setIsLoading(true);
    setError(null);
    getArticlesByTopic(topic)
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <h2 className="home-title">
        Welcome to <span className="NC">{topic || "NC"}</span> articles
      </h2>
      {!topic && (
        <div className="topic-photos">
          <Link to="/?topic=cooking" className="topic-link">
            <span className="topic-title">Cooking Articles</span>
            <img
              id="cooking-photo"
              src="https://img.jakpost.net/c/2018/06/27/2018_06_27_48298_1530062479._large.jpg"
              alt="a chopping board with some ingredients around it"
            />
          </Link>
          <Link to="/?topic=coding" className="topic-link">
            <span className="topic-title">Coding Articles</span>
            <img
              id="coding-photo"
              src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
              alt="some complicated code on a screen"
            />
          </Link>
          <Link to="/?topic=football" className="topic-link">
            <span className="topic-title">Football Articles</span>
            <img
              id="football-photo"
              src="https://cdn.britannica.com/51/190751-050-147B93F7/soccer-ball-goal.jpg"
              alt="a football touching the net"
            />
          </Link>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="articles-div">
        {articles.map((article) => (
          <Link to={`/articles/${article.article_id}`} key={article.article_id}>
            <div className="filtered-articles">
              <h3>{article.title}</h3>
              <p>Article by {article.author}</p>
              <img
                src={article.article_img_url}
                alt="article image"
                id="topic-article-img"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ArticlesByTopic;
