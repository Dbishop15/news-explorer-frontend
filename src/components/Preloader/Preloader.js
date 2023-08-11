import React, { useState, useEffect } from "react";
import "./Preloader.css";
import NoResults from "./NoResults";
import ResultErrors from "./ResultErrors";

const Preloader = ({ isSearching, nothingFound }) => {
  return (
    <div className="preloader">
      {isSearching && !nothingFound && (
        <div className="preloader__container">
          <i className="preloader__circle"></i>
          <p className="preloader__text">Searching for news...</p>
        </div>
      )}
      {nothingFound && <NoResults />}
      {<ResultErrors />}
    </div>
  );
};

export default Preloader;
