import React from "react";
import { useMatch } from "react-router-dom";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  keyword,
  articles,
  numberOfCards,
  handleSeeMoreArticles,
  isLoggedIn,
}) {
  const match = useMatch("/");
  return (
    <div className="cards">
      <div className="cards__container">
        {match && numberOfCards < articles?.length && (
          <h2 className="cards__container-title">{`Search Results: ${keyword}`}</h2>
        )}
        <ul className="cards__container-list">
          {articles?.slice(0, numberOfCards).map((article) => {
            return (
              <NewsCard
                keyword={keyword}
                key={article._id}
                article={article}
                numberOfCards={numberOfCards}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
        </ul>
      </div>
      {match && numberOfCards < articles?.length && (
        <button
          type="button"
          className="cards__button"
          onClick={handleSeeMoreArticles}
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default NewsCardList;