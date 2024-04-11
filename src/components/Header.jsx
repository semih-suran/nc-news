import React from "react";
import logo from "../media/logo-no-color.png";
import { Link } from "react-router-dom";
import { useUser } from "../components/UserContext";

const Header = ({ onToggleUserList }) => {
  const { selectedUserAvatar } = useUser();
  return (
    <header className="header">
      <Link className="nc-news-top" to={`/`}>
          <img src={logo} className="nc-news-header" alt="NC News Logo" />
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
