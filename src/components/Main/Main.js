import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";
import "../Preloader/Preloader";

function Main({ searchBotton, isSearching }) {
  return (
    <div className="main__container">
      <h1 className="main__container-title">What's going on in the world?</h1>
      <p className="main__container-subtitle">
        Find the latest new on any topic and save them in your personal Account
      </p>
      <SearchForm searchBotton={searchBotton} isSearching={isSearching} />
    </div>
  );
}

export default Main;
