import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ handleHomeClick, handleArticlesClick }) => {
  return (
    <nav className="nav-bar">
      <Link to="/" onClick={handleHomeClick}>Home</Link>
      <Link to="/articles" onClick={handleArticlesClick}>Articles</Link>
    </nav>
  );
};

export default NavBar;