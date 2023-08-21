import "./SavedNewsHeader.css";

function SavedNewsHeader({ savedNewsArticles }) {
  let currentUser = "Elis";

  const keywords = savedNewsArticles?.map((article) => article?.keyword);

  console.log(savedNewsArticles);
  const getKeywordString = (data) => {
    if (keywords?.length === 1) {
      return `${keywords[0]}`;
    }

    if (keywords?.length > 1) {
      const count = {};

      for (const keyword of data) {
        if (count[keyword]) {
          count[keyword]++;
        } else {
          count[keyword] = 1;
        }
      }

      const counted = [];
      for (const item in count) {
        counted.push([item, count[item]]);
      }

      counted.sort((a, b) => {
        return b[1] - a[1];
      });

      if (counted.length === 1) {
        return `${counted[0][0]}`;
      } else if (counted.length === 2) {
        return `${counted[0][0]} and ${counted[1][0]}`;
      } else {
        return `${counted[0][0]}, ${counted[1][0]}, and ${
          counted.length - 2
        } more`;
      }
    } else {
      return null;
    }
  };

  const keywordString = getKeywordString(keywords);
  console.log(keywordString);

  return (
    <section className="save-news-header">
      <p className="save-news-header__text-head">Saved articles</p>
      <h2 className="save-news-header__title">
        {currentUser}, you have {`${savedNewsArticles?.length} saved articles`}
      </h2>
      <p className="save-news-header__text">
        By keywords:{" "}
        <span className="saved-news-header__keywords_bold">
          {keywordString ? keywordString : ""}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
