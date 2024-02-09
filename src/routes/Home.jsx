import React from "react";
import ArticlesByTopic from "./ArticlesByTopic";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get("topic");

  return (
    <>
      <ArticlesByTopic topic={topic} />
    </>
  );
}

export default Home;