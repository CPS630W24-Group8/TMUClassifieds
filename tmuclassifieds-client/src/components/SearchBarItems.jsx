import React from 'react';

const SearchBarItems = ({ searchInput, handleSearchChange }) => {
  return (
    <div className="row">
      <div className="col-md-4">
      Filters
      <div>
          <div>
            <input type="checkbox" id="tag" name="textbooks" />
            <label htmlFor="textbooks">Textbooks</label>
          </div>
          <div>
            <input type="checkbox" id="tag" name="tools" />
            <label htmlFor="tools">Tools</label>
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

export default SearchBarItems;
