import React, { useState } from "react";
import css from "./SearchForm.module.css";

export const SearchForm = ({ onSubmit }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      return alert("Please enter your query word!");
    }
    onSubmit(search);
    setSearch("");
  };
  return (
    <form type="submit" onSubmit={handleSubmit} className={css.form}>
      <span className={css.icon}>&#128270;</span>
      <input
        className={css.input}
        type="search"
        name="searchForm"
        placeholder="Search your trip"
        onChange={handleChange}
        value={search}
      />
    </form>
  );
};
