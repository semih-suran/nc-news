import React, { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import ArticleCard from "../routes/ArticleCard";
import Users from "../routes/Users";

function Body() {
  const [showArticles, setShowArticles] = useState(false);
  const [isHomeImagesVisible, setIsHomeImagesVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedArticleTopic, setSelectedArticleTopic] = useState(false);

  const handleArticlesClick = () => {
    setShowArticles(true);
    setIsHomeImagesVisible(false);
    setSelectedArticle(false);
    setSelectedUser(false);
    setSelectedArticleTopic(false);
  };

  const handleHomeClick = () => {
    setShowArticles(false);
    setSelectedArticle(false);
    setShowArticles(false);
    setSelectedUser(false);
    setIsHomeImagesVisible(true);
  };

  const handleUserClick = () => {
    setIsHomeImagesVisible(false);
    setSelectedArticle(false);
    setSelectedArticleTopic(false);
    setShowArticles(false);
    setSelectedUser(true);
  };

  const [showUserList, setShowUserList] = useState(false);

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  return (
    <>
      <Header onToggleUserList={toggleUserList} />
      {showUserList && <Users onToggleUserList={toggleUserList} />}
      <NavBar
        handleHomeClick={handleHomeClick}
        handleArticlesClick={handleArticlesClick}
        onToggleUserList={toggleUserList}
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
    </>
  );
}

export default Body;
