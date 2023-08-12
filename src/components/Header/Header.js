import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useMatch } from "react-router-dom";

function Header({ onLoginButton, isLoggedIn, handleMenuModal, onSignout }) {
  const match = useMatch("/");
  return (
    <header className={match ? "header" : "header-saved-news"}>
      <a
        href="/"
        className={match ? "header__title" : "header__title-saved-news"}
      >
        NewsExplorer
      </a>
      <button
        type="button"
        className={
          match
            ? "header__hamburger header__button-open"
            : "header__hamburger header__button-open-saved-news"
        }
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
