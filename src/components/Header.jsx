import React from "react";
import logo from "../media/logo-no-background.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <Link className="nc-news-top" to={`/`}>
          <img src={logo} className="nc-news-header" alt="NC News Logo" />
      </Link>
      <button className="sign-in-btn">User</button>
    </header>
  );
};

export default Header;
