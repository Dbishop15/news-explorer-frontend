import React from "react";
import notfound from "../../images/notfound.svg";
import "./NoResults.css";

const NoResults = () => {
  return (
    <div className="results__not-found">
      <img
        className="results__not-found-image"
        src={notfound}
        alt="notfound-icon"
      />
      <p className="results__not-found-text">NOT FOUND</p>
      <p className="results__not-found-para">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
};

export default NoResults;
