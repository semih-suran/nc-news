import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

const NavBar = ({ handleHomeClick, handleArticlesClick, onToggleUserList }) => {
  const { selectedUser } = useUser();
  const handleToggleUserList = () => {
    onToggleUserList();
  };

  return (
    <nav className="nav-bar">
      <Link to="/" onClick={handleHomeClick}>
        Home
      </Link>
      <Link to="/articles" onClick={handleArticlesClick}>
        All Articles
      </Link>
      {selectedUser && (
        <p className="current-user" onClick={handleToggleUserList}>
          {selectedUser}
        </p>
      )}
    </nav>
  );
};

export default NavBar;
