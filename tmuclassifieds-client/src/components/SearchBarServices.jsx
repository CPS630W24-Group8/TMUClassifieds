import React from 'react';

const SearchBarServices = ({ searchInput, handleSearchChange }) => {
  return (
    <div className="row">
      <div className="col-md-4">
      Filters
      <div>
          <div>
          <input type="checkbox" id="tag" name="math" />
            <label htmlFor="textbooks">Math</label>
          </div>
          <div>
            <input type="checkbox" id="tag" name="writing" />
            <label htmlFor="tools">Writing</label>
          </div>
          <div>
            <input type="checkbox" id="tag" name="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Type to search..."
          value={searchInput}
          onChange={handleSearchChange}
        />
        <br />
      </div>
  </div>
  );
};

export default SearchBarServices;
