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
        Welcome to <span className="NC">NC</span> News
      </h2>
      {!topic && (
        <div className="topic-photos">
          <Link to="/?topic=cooking">
            Cooking Articles
            <img
              id="cooking-photo"
              src="https://img.jakpost.net/c/2018/06/27/2018_06_27_48298_1530062479._large.jpg"
              alt="a chopping board with some ingredients around it"
            />
          </Link>
          <Link to="/?topic=coding">
            Coding Articles
            <img
              id="coding-photo"
              src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
              alt="some complicated code on a screen"
            />
          </Link>
          <Link to="/?topic=football">
            Football Articles
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
            <h4>{article.title}</h4>
            <p>
              An article by {article.author}. About: {article.topic}
            </p>
            <img
              src={article.article_img_url}
              alt="article image"
              className="topic-article-img"
            />
            <p>{article.body}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ArticlesByTopic;
