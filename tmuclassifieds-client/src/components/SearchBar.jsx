import React from 'react';

const SearchBar = ({ searchInput, handleSearchChange }) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Type to search..."
        value={searchInput} // Controlled input using searchInput prop
        onChange={handleSearchChange} // Call handleSearchChange on input change
      />
    </div>
  );
};

export default SearchBar;
