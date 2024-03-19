import React from 'react';

const SearchBarItems = ({ searchInput, handleSearchChange }) => {
  return (
    <div className="container">
      <div className="row">

        <div className="col-3">
          <div className='btn-group' role='group' aria-label="Tags button group">
            <input type="checkbox" id="textbooks-tag" className='btn-check' autoComplete='off' />
            <label htmlFor="textbooks-tag" className="btn btn-outline-secondary">Textbooks</label>

            <input type="checkbox" id="tools-tag" className='btn-check' autoComplete='off' />
            <label htmlFor="tools-tag" className="btn btn-outline-secondary">Tools</label>

            <input type="checkbox" id="other-tag" className='btn-check' autoComplete='off' />
            <label htmlFor="other-tag" className="btn btn-outline-secondary">Other</label>
          </div>
        </div>

        <div className="col-9">
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
    </div>
  );
};

export default SearchBarItems;
