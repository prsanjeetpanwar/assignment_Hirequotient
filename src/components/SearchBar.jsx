// SearchBar.js
import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;
