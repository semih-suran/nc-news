import React, { useState, useEffect } from "react";
import { getArticlesById, updateArticleVotes } from "../utils/api";
import { useParams, Link } from "react-router-dom";
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

  const handleVote = (voteType) => {
    const voteValue = voteType === "up" ? 1 : -1;
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + voteValue,
    }));

    updateArticleVotes(article_id, voteValue)
      // change | voteValue | to | "nonsense" | for the error feedback
      .then(() => {
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes,
          voteSuccess: true,
        }));
        setTimeout(() => {
          setArticle((prevArticle) => ({
            ...prevArticle,
            voteSuccess: false,
          }));
        }, 300);
      })
      .catch((error) => {
        alert("<<< Failed to update the article vote >>>");
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes - voteValue,
          voteFailure: true,
        }));
        setTimeout(() => {
          setArticle((prevArticle) => ({
            ...prevArticle,
            voteFailure: false,
          }));
        }, 1000);
      });
  };

  return (
    <div className="articles-div" id="article-card">
      <Link to="/articles" id="back-to-articles" onClick={handleArticlesClick}>
        ⬅ Back to All Articles
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
          <p>Category: {article.topic}</p>
          <p>Written By: {article.author}</p>
          <p>Votes: {article.votes}</p>
          <button
            id="inc-votes"
            onClick={() => handleVote("up")}
            style={{
              backgroundColor: article.voteSuccess
                ? "green"
                : article.voteFailure
                ? "red"
                : "black",
              transition: "background-color 0.5s",
            }}
          >
            Vote 👍
          </button>
          <button
            id="dec-votes"
            onClick={() => handleVote("down")}
            style={{
              backgroundColor: article.voteSuccess
                ? "green"
                : article.voteFailure
                ? "red"
                : "black",
              transition: "background-color 0.5s",
            }}
          >
            Vote 👎
          </button>
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
