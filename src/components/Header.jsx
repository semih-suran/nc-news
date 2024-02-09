import React from "react";
import logo from "../media/logo-no-color.png";
import { Link } from "react-router-dom";

const Header = ({onToggleUserList}) => {
  return (
    <header className="header">
      <Link className="nc-news-top" to={`/`}>
          <img src={logo} className="nc-news-header" alt="NC News Logo" />
      </Link>
      <button className="sign-in-btn" onClick={onToggleUserList}>Select User</button>
    </header>
  );
};

export default Header;
