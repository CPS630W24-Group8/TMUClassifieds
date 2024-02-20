import React from 'react';

const SearchBar = ({ searchInput, handleSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Type to search..."
        value={searchInput} // Controlled input using searchInput prop
        onChange={handleSearchChange} // Call handleSearchChange on input change
      />
      <br />
    </div>
  );
};

export default SearchBar;
