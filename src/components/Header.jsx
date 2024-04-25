import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../components/UserContext";

const Header = ({ onToggleUserList }) => {
  const { selectedUserAvatar } = useUser();
  return (
    <header className="header">
      <Link className="nc-news-top" to={`/`}>
          <p className="nc-news-header" alt="NC News Logo" ><span id="head-N">N</span><span id="head-C">C</span> News</p>
      </Link>
      {selectedUserAvatar ? (
        <img src={selectedUserAvatar} alt="User Avatar" className="user-avatar" onClick={onToggleUserList} />
      ) : (
        <button className="sign-in-btn" onClick={onToggleUserList}>Select User</button>
      )}
    </header>
  );
};

export default Header;
