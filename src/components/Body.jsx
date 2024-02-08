import React, { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import ArticleCard from "../routes/ArticleCard";
import Users from "../routes/Users";

function Body() {
  const [showArticles, setShowArticles] = useState(false);
  const [isHomeImagesVisible, setIsHomeImagesVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(false);

  const handleArticlesClick = () => {
    setShowArticles(true);
    setIsHomeImagesVisible(false);
    setSelectedArticle(false);
  };

  const handleHomeClick = () => {
    setShowArticles(false);
    setIsHomeImagesVisible(true);
    setSelectedArticle(false);
  };

  return (
    <>
      <Header />
      <NavBar
        handleHomeClick={handleHomeClick}
        handleArticlesClick={handleArticlesClick}
        showArticles={showArticles}
        isHomeImagesVisible={isHomeImagesVisible}
        selectedArticle={selectedArticle}
      />
      {selectedArticle && (
        <ArticleCard
          handleArticlesClick={handleArticlesClick}
          showArticles={showArticles}
          isHomeImagesVisible={isHomeImagesVisible}
          selectedArticle={selectedArticle}
        />
      )}
      {/* <Users></Users> */}
    </>
  );
}

export default Body;
