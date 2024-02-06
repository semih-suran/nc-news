import React, { useState } from "react";

const NavBar = () => {
  const [showArticles, setShowArticles] = useState(false);

  const handleClick = () => {
    setShowArticles(!showArticles);
  };

  return (
    <nav className="nav-bar">
      <button>Home</button>
      <button onClick={handleClick}>Articles</button>
      {showArticles}
    </nav>
  );
};

export default NavBar;