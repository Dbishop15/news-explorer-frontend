import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({ article, isLoggedIn, keyword, savedArticles }) {
  const [isVisible, setIsVisible] = useState(false);

  const saveHover = () => {
    if (isLoggedIn) {
      return;
    }
    setIsVisible(true);
  };
  const trashHover = () => {
    if (isLoggedIn) {
      return;
    }
    setIsVisible(true);
  };
  return (
    <li className="card">
      <button
        className={`card__trash-button ${
          savedArticles ? "" : "card__trash-button-hidden"
        } `}
        onMouseEnter={trashHover}
        onMouseLeave={() => setIsVisible(false)}
        type="button"
      ></button>
      <button
        className={`card__save-button ${
          savedArticles ? "card__save-button-hidden" : ""
        } `}
        type="button"
        onMouseEnter={saveHover}
        onMouseLeave={() => setIsVisible(false)}
      ></button>
      <button
        className={`card__hover-text ${
          isVisible ? "" : "card__hover-text-hidden"
        } `}
        type="button"
      >
        Remove from saved
      </button>
      <button
        className={`card__hover-text ${
          isVisible ? "" : "card__hover-text-hidden"
        } `}
        type="button"
      >
        Sign in to save articles
      </button>
      <button
        className={`card__keyword-button ${
          savedArticles ? "" : "card__keyword-button-hidden"
        } `}
        type="button"
      >
        {keyword}
      </button>
      <a href={article.url} className="card__link">
        <img
          className="card__image"
          src={article.urlToImage}
          alt={article.title}
        />
        <p className="card__date">{article.publishedAt}</p>
        <h3 className="card__title">{article.title}</h3>
        <p className="card__text">{article.description}</p>
        <p className="card__source">{article.source.name}</p>
      </a>
    </li>
  );
}

export default NewsCard;
