import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "./SavedNews.css";

function SavedNews({ articles }) {
  return (
    <div className="save-news">
      <SavedNewsHeader articles={articles} />
      <NewsCardList />
    </div>
  );
}

export default SavedNews;
