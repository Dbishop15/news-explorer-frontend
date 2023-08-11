import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({ article, isLoggedIn }) {
  const [isVisible, setIsVisible] = useState(false);

  const saveHover = () => {
    if (isLoggedIn) {
      return;
    }
    setIsVisible(true);
  };
  return (
    <li className="card">
      <button className="card__trash-button" type="button"></button>
      <button
        className="card__save-button"
        type="button"
        onMouseEnter={saveHover}
        onMouseLeave={() => setIsVisible(false)}
      ></button>
      <button className="card__keyword-button" type="button"></button>
      <button
        className={`card__hover-text ${
          isVisible ? "" : "card__hover-text-hidden"
        } `}
        type="button"
      >
        Sign in to save articles
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
