import React from "react";
import logo from "../media/logo-no-background.png"
const Header = () => {
  return (
    <header className="header">
      <img
        src={logo}
        className="nc-news-header"
        alt="NC News Logo"
      />
      <button className="sign-in-btn">User</button>
    </header>
  );
};

export default Header;
