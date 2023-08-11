import React from "react";
import "./SearchForm.css";
import { useForm } from "../../hooks/useForm";

function SearchForm({ searchBotton }) {
  const { handleChange, values } = useForm({ topic: "" });
  const [isError, setIsError] = React.useState(false);

  const handleSearchInputChange = (evt) => {
    handleChange(evt);
    setIsError(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (values.topic === "") {
      setIsError(true);
    }

    if (values.topic !== "") {
      searchBotton(values.topic);
    }
  };
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        key="search-form"
        className="search-form__input"
        id="search-input"
        type="text"
        placeholder="Enter topic"
        name="topic"
        autoComplete="off"
        maxLength="40"
        onChange={handleSearchInputChange}
      />
      {isError && (
        <span className="search-form__input-error search-form__input-error_visible">
          Please enter a keyword
        </span>
      )}
      <button type="submit" className="button search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
