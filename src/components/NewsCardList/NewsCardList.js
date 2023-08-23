import React from "react";
import { useMatch } from "react-router-dom";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  keyword,
  newsArticles,
  numberOfCards,
  handleSeeMoreArticles,
  isLoggedIn,
  handleSaveArticle,
  handleDeleteArticle,
}) {
  const match = useMatch("/");
  return (
    <section className="cards">
      <div className="cards__container">
        {match && numberOfCards < newsArticles?.length && (
          <h2 className="cards__container-title">{`Search Results: ${keyword}`}</h2>
        )}
        <ul className="cards__container-list">
          {newsArticles.slice(0, numberOfCards).map((article) => {
            console.log(article);
            return (
              <NewsCard
                keyword={keyword}
                key={article?._id}
                cardInfo={article}
                numberOfCards={numberOfCards}
                isLoggedIn={isLoggedIn}
                handleSaveArticle={handleSaveArticle}
                handleDeleteArticle={handleDeleteArticle}
              />
            );
          })}
        </ul>
      </div>
      {match && numberOfCards < newsArticles?.length && (
        <button
          type="button"
          className="cards__button"
          onClick={handleSeeMoreArticles}
        >
          Show More
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
