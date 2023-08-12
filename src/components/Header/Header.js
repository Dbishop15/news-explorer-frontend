import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ onLoginButton, isLoggedIn, handleMenuModal, onSignout }) {
  return (
    <header className="header">
      <a href="/" className="header__title">
        NewsExplorer
      </a>
      <button
        type="button"
        className="header__hamburger header__button-open"
        onClick={handleMenuModal}
      ></button>
      <Navigation
        onLoginButton={onLoginButton}
        isLoggedIn={isLoggedIn}
        onSignout={onSignout}
      />
    </header>
  );
}

export default Header;
